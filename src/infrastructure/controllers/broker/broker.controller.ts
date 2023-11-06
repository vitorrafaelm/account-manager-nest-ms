import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { CreateBrokerUseCase } from "src/usecases/broker/createBrokerUseCase/createBrokerUseCase";
import { FindBrokerUseCase } from "src/usecases/broker/findBrokerUseCase/findBrokerUseCase";
import { CreateBroker } from "./dtos/createBroker";

@Controller('broker')
export class BrokerController {
    constructor(
        @Inject(UsecasesProxyModule.GET_BROKER_USECASES_PROXY)
        private readonly getBrokerUsecaseProxy: UseCaseProxy<FindBrokerUseCase>,
        @Inject(UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY)
        private readonly createBrokerUsecaseProxy: UseCaseProxy<CreateBrokerUseCase>,
      ) {}
    
    @Get('/:id')
    async getBroker(@Query('id') id: number) {
        const broker = await this.getBrokerUsecaseProxy.getInstance().execute(id); 
        
        if (!broker) {
            return {
                message: 'Broker not found'
            }
        }

        return broker;
    }

    @Post()
    async createBroker(@Body() broker: CreateBroker) {
        return await this.createBrokerUsecaseProxy.getInstance().execute(broker); 
    }
}