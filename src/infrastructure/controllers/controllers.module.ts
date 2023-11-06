import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { BrokerController } from './broker/broker.controller';

@Module({
    imports: [UsecasesProxyModule.register()], 
    controllers: [BrokerController]
})
export class ControllersModule {}
