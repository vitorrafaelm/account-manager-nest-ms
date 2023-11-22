import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserUpdatedPublishService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async publish(message: any) {
        try {
            this.amqpConnection.publish('broker_updated', '', message)
        } catch (error) {
            throw new Error(error)
        }
    }
}