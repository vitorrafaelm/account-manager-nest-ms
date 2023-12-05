import { Address } from "./address";

export class Broker {
    id: number; 
    name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    identifier: string;
    profile_picture: string;
    account_status: string;
    iv: string; 
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;

    addresses: Address;
}