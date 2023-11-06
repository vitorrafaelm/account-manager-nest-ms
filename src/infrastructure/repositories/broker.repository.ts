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
    ) {}

    async get(brokerId: number): Promise<Broker> {
        return await this.brokerEntityRepository.findOne({ where: { id: brokerId } }); 
    }

    async insert(broker: Broker): Promise<Broker> {
        const brokerCreated = this.brokerEntityRepository.create(broker)
        const brokerInserted = await this.brokerEntityRepository.save(brokerCreated); 
        return this.brokerToEntity(brokerInserted);
    }

    async update(broker: Broker): Promise<Broker> {
        throw new Error("Method not implemented.");
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
        broker.broker_identifier = broker_inserted.broker_identifier;
        broker.profile_picture = broker_inserted?.profile_picture;
        broker.account_status = broker_inserted.account_status;
        broker.createdAt = broker_inserted?.createdAt; 
        broker.updatedAt = broker_inserted?.updatedAt;

        return broker;
    }
    
}