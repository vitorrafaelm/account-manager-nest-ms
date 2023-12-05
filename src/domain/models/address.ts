export class Address {
    id: number;
    broker_identifier: string;
    address_line_one: string; 
    address_line_two: string; 
    zipcode: string; 
    city: string;
    state: string; 
    country: string;
    is_deleted: boolean;
    created_at: Date; 
    updated_at: Date;
}