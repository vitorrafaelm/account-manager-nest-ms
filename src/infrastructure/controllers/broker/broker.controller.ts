import { Body, Controller, Delete, Get, Inject, Patch, Post, Req, Request, Response, UseGuards } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { CreateBrokerUseCase } from "src/usecases/broker/createBrokerUseCase/createBrokerUseCase";
import { FindBrokerUseCase } from "src/usecases/broker/findBrokerUseCase/findBrokerUseCase";
import { CreateBroker } from "./dtos/createBroker";
import { UpdateBroker } from "./dtos/updateBroker";
import { UpdateBrokerUseCase } from "src/usecases/broker/updateBrokerUseCase/updateBrokerUseCase";
import { AuthLoginDto } from "./dtos/login";
import { LoginBrokerUseCase } from "src/usecases/broker/loginBrokerUseCase/loginBrokerUseCase";
import { JwtAuthGuard } from "src/infrastructure/commom/guards/jwtAuth.guard";
import { SoftDeleteBrokerUseCase } from "src/usecases/broker/softDeleteBrokerUseCase/softDeleteBrokerUseCase";

@Controller('broker')
export class BrokerController {
    constructor(
        @Inject(UsecasesProxyModule.GET_BROKER_USECASES_PROXY)
        private readonly getBrokerUsecaseProxy: UseCaseProxy<FindBrokerUseCase>,
        @Inject(UsecasesProxyModule.CREATE_BROKER_USECASES_PROXY)
        private readonly createBrokerUsecaseProxy: UseCaseProxy<CreateBrokerUseCase>,
        @Inject(UsecasesProxyModule.UPDATE_BROKER_USECASES_PROXY)
        private readonly updateBrokerUsecaseProxy: UseCaseProxy<UpdateBrokerUseCase>,
        @Inject(UsecasesProxyModule.LOGIN_BROKER_USECASES_PROXY)
        private readonly loginBrokerUsecasesProxy: UseCaseProxy<LoginBrokerUseCase>,
        @Inject(UsecasesProxyModule.SOFT_DELETE_BROKER_USECASES_PROXY)
        private readonly softDeleteBrokerUsecasesProxy: UseCaseProxy<SoftDeleteBrokerUseCase>,
      ) {}

    @Post('/login')
    async login(@Body() loginDTO: AuthLoginDto, @Request() request: any) {
        try {
            const access_informations = await this.loginBrokerUsecasesProxy.getInstance().execute(loginDTO.email, loginDTO.password); 
            request.res.setHeader('Set-Cookie', [access_informations.cookie]);
            request.res.statusCode = 200

            return access_informations;
        } catch (error) {
            request.res.statusCode = 400
            return {
                error: '400', 
                message: error.message
            }
        }

        
    }

    @Post('/logout')
    async logout(@Body() broker: CreateBroker) {
        return await this.createBrokerUsecaseProxy.getInstance().execute(broker); 
    }
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async getBroker(@Req() request) {
        const broker = await this.getBrokerUsecaseProxy.getInstance().execute(request.user); 
        
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

    @Patch()
    @UseGuards(JwtAuthGuard)
    async updateBroker(@Body() broker: UpdateBroker, @Req() request) {
        return await this.updateBrokerUsecaseProxy.getInstance().execute(broker, request.user); 
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async deleteBroker(@Req() request) {
        return await this.softDeleteBrokerUsecasesProxy.getInstance().execute(request.user); 
    }
}