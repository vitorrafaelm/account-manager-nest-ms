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


@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, RabbitmqModule],
})
export class UsecasesProxyModule {
  static GET_BROKER_USECASES_PROXY = 'getBrokerUsecasesProxy';
  static CREATE_BROKER_USECASES_PROXY = 'createBrokerUsecasesProxy';
  static UPDATE_BROKER_USECASES_PROXY = 'updateBrokerUsecasesProxy';

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
          inject: [DatabaseBrokerRepository, UserCreatedPublishService],
          provide: UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, userCreatedPublish: UserCreatedPublishService) => new UseCaseProxy(new CreateBrokerUseCase(brokerRepository, userCreatedPublish)),
        }, 
        {
          inject: [DatabaseBrokerRepository, UserUpdatedPublishService],
          provide: UsecasesProxyModule.UPDATE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository, userUpdatePublish: UserUpdatedPublishService) => new UseCaseProxy(new UpdateBrokerUseCase(brokerRepository, userUpdatePublish)),
        }
      ],
      exports: [
        UsecasesProxyModule.GET_BROKER_USECASES_PROXY,
        UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_BROKER_USECASES_PROXY
      ],
    };
  }
}