import { Address } from "src/domain/models/address";
import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { UserUpdatedPublishService } from "src/infrastructure/rabbitmq/publishers/user-updated/user-update-publish.service";

interface IPayload {
    email: string; 
    identifier: string
}

export class SoftDeleteBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly userUpdatedPublish: UserUpdatedPublishService
    ) { }

    async execute(
        payload: IPayload
    ): Promise<Broker> {
        const current_broker_account = await this.brokerRepository.getUserByIdentifier(payload.identifier);
        const broker = new Broker();

        broker.id = current_broker_account.id;
        broker.account_status = 'DELETED';
        broker.is_deleted = true;
        broker.addresses = new Address()
        broker.addresses.is_deleted = true;
        broker.addresses.id = current_broker_account.addresses.id;

        const updatedResult = await this.brokerRepository.softDelete(broker);
        this.userUpdatedPublish.publish(updatedResult);

        return updatedResult;
    }
}