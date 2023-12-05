import { DynamicModule, Module } from '@nestjs/common';
import { FindBrokerUseCase } from '../../usecases/broker/findBrokerUseCase/findBrokerUseCase';
import { CreateBrokerUseCase } from '../../usecases/broker/createBrokerUseCase/createBrokerUseCase';

import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseBrokerRepository } from '../repositories/broker.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { UserCreatedPublishService } from '../rabbitmq/publishers/user-created/user-create-publish.service';
import { UserUpdatedPublishService } from '../rabbitmq/publishers/user-updated/user-update-publish.service';
import { UpdateBrokerUseCase } from 'src/usecases/broker/updateBrokerUseCase/updateBrokerUseCase';
import { CryptoService } from '../commom/utils/crypto/crypto.service';
import { CryptoModule } from '../commom/utils/crypto/crypto.module';
import { LoginBrokerUseCase } from 'src/usecases/broker/loginBrokerUseCase/loginBrokerUseCase';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { SoftDeleteBrokerUseCase } from 'src/usecases/broker/softDeleteBrokerUseCase/softDeleteBrokerUseCase';


@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, RabbitmqModule, CryptoModule, JwtModule],
})
export class UsecasesProxyModule {
  static GET_BROKER_USECASES_PROXY = 'getBrokerUsecasesProxy';
  static CREATE_BROKER_USECASES_PROXY = 'createBrokerUsecasesProxy';
  static UPDATE_BROKER_USECASES_PROXY = 'updateBrokerUsecasesProxy';
  static LOGIN_BROKER_USECASES_PROXY = 'loginBrokerUsecasesProxy';
  static SOFT_DELETE_BROKER_USECASES_PROXY = 'softDeleteBrokerUsecasesProxy'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseBrokerRepository],
          provide: UsecasesProxyModule.GET_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository) => new UseCaseProxy(new FindBrokerUseCase(brokerRepository)),
        },
        {
          inject: [DatabaseBrokerRepository, UserCreatedPublishService, CryptoService],
          provide: UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, userCreatedPublish: UserCreatedPublishService, cryptoService: CryptoService) => new UseCaseProxy(new CreateBrokerUseCase(brokerRepository, userCreatedPublish, cryptoService)),
        }, 
        {
          inject: [DatabaseBrokerRepository, UserUpdatedPublishService, CryptoService],
          provide: UsecasesProxyModule.UPDATE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, userUpdatePublish: UserUpdatedPublishService, cryptoService: CryptoService) => new UseCaseProxy(new UpdateBrokerUseCase(brokerRepository, userUpdatePublish, cryptoService)),
        }, 
        {
          inject: [DatabaseBrokerRepository, JwtTokenService, EnvironmentConfigService, CryptoService],
          provide: UsecasesProxyModule.LOGIN_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, JwtTokenService: IJwtService, jwtConfig: EnvironmentConfigService, cryptoService: CryptoService) => new UseCaseProxy(new LoginBrokerUseCase(brokerRepository, JwtTokenService, jwtConfig, cryptoService)),
        }, 
        {
          inject: [DatabaseBrokerRepository, UserUpdatedPublishService],
          provide: UsecasesProxyModule.SOFT_DELETE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, userUpdatePublish: UserUpdatedPublishService) => new UseCaseProxy(new SoftDeleteBrokerUseCase(brokerRepository, userUpdatePublish)),
        }
      ],
      exports: [
        UsecasesProxyModule.GET_BROKER_USECASES_PROXY,
        UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_BROKER_USECASES_PROXY, 
        UsecasesProxyModule.LOGIN_BROKER_USECASES_PROXY,
        UsecasesProxyModule.SOFT_DELETE_BROKER_USECASES_PROXY,
      ],
    };
  }
}