import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";

interface IPayload {
    email: string; 
    identifier: string
}

export class FindBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository
    ) {}

    async execute(payload: IPayload) {
        return await this.brokerRepository.getUserByIdentifier(payload.identifier)
    }
}