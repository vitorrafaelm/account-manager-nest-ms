import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CreateBroker } from "src/infrastructure/controllers/broker/dtos/createBroker";

export class CreateBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository
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
            account_status
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

        const insertionResult = await this.brokerRepository.insert(broker);
        return insertionResult;
    }
}