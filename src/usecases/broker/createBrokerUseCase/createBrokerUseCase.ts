import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CryptoService } from "src/infrastructure/commom/utils/crypto/crypto.service";
import { CreateBroker } from "src/infrastructure/controllers/broker/dtos/createBroker";
import { UserCreatedPublishService } from "src/infrastructure/rabbitmq/publishers/user-created/user-create-publish.service";

export class CreateBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly userCreatedPublish: UserCreatedPublishService,
        private readonly cryptoSerive: CryptoService
    ) { }

    async execute(
        {
            name,
            email,
            password,
            document_type,
            document_number,
            identifier,
            profile_picture,
            account_status, 
            address
        }: CreateBroker
    ): Promise<Broker> {
        const broker = new Broker();
        
        const { encryptedData, initVector } = await this.cryptoSerive.encrypt(password); 

        broker.name = name;
        broker.email = email;
        broker.password = encryptedData;
        broker.document_type = document_type;
        broker.document_number = document_number;
        broker.identifier = identifier;
        broker.profile_picture = profile_picture;
        broker.account_status = account_status;
        broker.iv = initVector.toString();

        console.log(address, 'address')
        broker.addresses = address;
        broker.addresses.broker_identifier = identifier;

        const insertionResult = await this.brokerRepository.insert(broker);
        this.userCreatedPublish.publish(insertionResult);

        return insertionResult;
    }
}