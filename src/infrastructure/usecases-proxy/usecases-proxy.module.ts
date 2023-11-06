import { DynamicModule, Module } from '@nestjs/common';
import { FindBrokerUseCase } from '../../usecases/broker/findBrokerUseCase/findBrokerUseCase';
import { CreateBrokerUseCase } from '../../usecases/broker/createBrokerUseCase/createBrokerUseCase';

import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseBrokerRepository } from '../repositories/broker.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';


@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static GET_BROKER_USECASES_PROXY = 'getBrokerUsecasesProxy';
  static CREATE_BROKER_USECASES_PROXY = 'createBrokerUsecasesProxy';

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
          inject: [DatabaseBrokerRepository],
          provide: UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
          useFactory: (brokerRepository: DatabaseBrokerRepository) => new UseCaseProxy(new CreateBrokerUseCase(brokerRepository)),
        }
      ],
      exports: [
        UsecasesProxyModule.GET_BROKER_USECASES_PROXY,
        UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY,
      ],
    };
  }
}