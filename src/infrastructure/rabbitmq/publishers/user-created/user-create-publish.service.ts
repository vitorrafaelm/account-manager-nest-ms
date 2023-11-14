import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserCreatedPublishService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async publish(message: any) {
        try {
            this.amqpConnection.publish('user_created', '', message)
        } catch (error) {
            throw new Error(error)
        }
    }
}