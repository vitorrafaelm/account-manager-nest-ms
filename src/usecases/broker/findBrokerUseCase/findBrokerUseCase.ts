import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";

export class FindBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository
    ) {}

    async execute(brokerId: number) {
        return await this.brokerRepository.get(brokerId);
    }
}