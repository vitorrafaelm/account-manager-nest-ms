import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Broker } from "src/domain/models/broker";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";

@Injectable()
export class DatabaseBrokerRepository implements BrokerRepository {

    constructor(
        @InjectRepository(Broker)
        private readonly brokerEntityRepository: Repository<Broker>
    ) { }

    async getUserByEmail(email: string): Promise<Broker> {
        return await this.brokerEntityRepository.findOne({ where: { email }, relations: { addresses: true } });
    }

    async getUserByIdentifier(identifier: string): Promise<Broker> {
        return await this.brokerEntityRepository.findOne({ where: { identifier }, relations: { addresses: true } });
    }

    async get(brokerId: number): Promise<Broker> {
        return await this.brokerEntityRepository.findOne({ where: { id: brokerId }, relations: { addresses: true } });
    }

    async insert(broker: Broker): Promise<Broker> {
        const brokerCreated = this.brokerEntityRepository.create(broker);
        console.log(brokerCreated)
        const brokerInserted = await this.brokerEntityRepository.save(brokerCreated);
        return this.brokerToEntity(brokerInserted);
    }

    async update(broker: Broker): Promise<Broker> {
        const brokerUpdated = await this.brokerEntityRepository.save({ id: broker.id, ...broker });
        return brokerUpdated;
    }

    async softDelete(broker: Broker): Promise<Broker> {
        const brokerUpdated = await this.brokerEntityRepository.save({ 
            id: broker.id, 
            is_deleted: broker.is_deleted, 
            account_status: broker.account_status,
            addresses: { is_deleted: broker.addresses.is_deleted, ...broker }});
        return brokerUpdated;
    }

    async delete(brokerId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private brokerToEntity(broker_inserted: Broker): Broker {
        const broker = new Broker();

        broker.id = broker_inserted.id;
        broker.name = broker_inserted.name;
        broker.email = broker_inserted.email;
        broker.password = broker_inserted.password;
        broker.document_type = broker_inserted.document_type;
        broker.document_number = broker_inserted.document_number;
        broker.identifier = broker_inserted.identifier;
        broker.profile_picture = broker_inserted?.profile_picture;
        broker.account_status = broker_inserted.account_status;
        broker.createdAt = broker_inserted?.createdAt;
        broker.updatedAt = broker_inserted?.updatedAt;

        broker.addresses = broker_inserted.addresses;

        return broker;
    }

}