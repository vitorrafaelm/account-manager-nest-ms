import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CreateBroker } from "src/infrastructure/controllers/broker/dtos/createBroker";
import { UserCreatedPublishService } from "src/infrastructure/rabbitmq/publishers/user-created/user-create-publish.service";

export class CreateBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly userCreatedPublish: UserCreatedPublishService
    ) { }

    async execute(
        {
            name,
            email,
            password,
            document_type,
            document_number,
            broker_identifier,
            profile_picture,
            account_status, 
            address
        }: CreateBroker
    ): Promise<Broker> {
        const broker = new Broker();

        broker.name = name;
        broker.email = email;
        broker.password = password;
        broker.document_type = document_type;
        broker.document_number = document_number;
        broker.broker_identifier = broker_identifier;
        broker.profile_picture = profile_picture;
        broker.account_status = account_status;

        broker.address = address;

        const insertionResult = await this.brokerRepository.insert(broker);
        this.userCreatedPublish.publish(insertionResult);

        return insertionResult;
    }
}