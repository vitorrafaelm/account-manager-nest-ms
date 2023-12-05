import { Broker } from "../models/broker";

export interface BrokerRepository {
    get(brokerId: number): Promise<Broker>;
    insert(broker: Broker): Promise<Broker>; 
    update(broker: Broker): Promise<Broker>; 
    delete(brokerId: number): Promise<void>; 

    getUserByEmail(email: string): Promise<Broker>;
    getUserByIdentifier(identifier: string): Promise<Broker>;
    softDelete(broker: Broker): Promise<Broker>; 
}