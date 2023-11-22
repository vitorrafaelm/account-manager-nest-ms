import { Global, Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq"; 
import { ConfigService } from "@nestjs/config";
import { UserUpdatedPublishService } from "./user-update-publish.service";


@Global()
@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            inject: [ConfigService], 
            useFactory: (configService: ConfigService) => ({
                name: 'publisher', 
                uri: configService.get('RABBITMQ_URL'), 
                connectionInitOptions: { wait: false }
            })
        })
    ], 
    providers: [UserUpdatedPublishService], 
    exports: [UserUpdatedPublishService]
})
export class UserUpdatedPublishModule {}