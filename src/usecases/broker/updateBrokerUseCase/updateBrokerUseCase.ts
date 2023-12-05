import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CryptoService } from "src/infrastructure/commom/utils/crypto/crypto.service";
import { UpdateBroker } from "src/infrastructure/controllers/broker/dtos/updateBroker";
import { UserUpdatedPublishService } from "src/infrastructure/rabbitmq/publishers/user-updated/user-update-publish.service";

interface IPayload {
    email: string; 
    identifier: string
}

export class UpdateBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly userUpdatedPublish: UserUpdatedPublishService, 
        private readonly cryptoSerive: CryptoService
    ) { }

    async execute(
        {
            id,
            name,
            email,
            password,
            document_type,
            document_number,
            profile_picture,
            account_status, 
            address
        }: UpdateBroker, 
        payload: IPayload
    ): Promise<Broker> {
        const current_broker_account = await this.brokerRepository.getUserByIdentifier(payload.identifier);
        const broker = new Broker();

        const { encryptedData, initVector } = await this.cryptoSerive.encrypt(password); 

        broker.id = current_broker_account.id;
        broker.name = name;
        broker.email = email;
        broker.password = encryptedData;
        broker.document_type = document_type;
        broker.document_number = document_number;
        broker.identifier = current_broker_account.identifier;
        broker.profile_picture = profile_picture;
        broker.account_status = account_status;
        broker.iv = initVector;

        broker.addresses = address;
        broker.addresses.id = current_broker_account.addresses.id;

        const updatedResult = await this.brokerRepository.update(broker);
        this.userUpdatedPublish.publish(updatedResult);

        return updatedResult;
    }
}