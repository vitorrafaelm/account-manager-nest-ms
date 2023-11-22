import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CreateBroker } from "src/infrastructure/controllers/broker/dtos/createBroker";
import { UpdateBroker } from "src/infrastructure/controllers/broker/dtos/updateBroker";
import { UserUpdatedPublishService } from "src/infrastructure/rabbitmq/publishers/user-updated/user-update-publish.service";

export class UpdateBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly userUpdatedPublish: UserUpdatedPublishService
    ) { }

    async execute(
        {
            id,
            name,
            email,
            password,
            document_type,
            document_number,
            broker_identifier,
            profile_picture,
            account_status, 
            address
        }: UpdateBroker
    ): Promise<Broker> {
        const broker = new Broker();

        broker.id = id;
        broker.name = name;
        broker.email = email;
        broker.password = password;
        broker.document_type = document_type;
        broker.document_number = document_number;
        broker.broker_identifier = broker_identifier;
        broker.profile_picture = profile_picture;
        broker.account_status = account_status;

        broker.address = address;

        const updatedResult = await this.brokerRepository.update(broker);
        this.userUpdatedPublish.publish(updatedResult);

        return updatedResult;
    }
}