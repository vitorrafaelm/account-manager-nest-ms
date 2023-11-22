import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Address {
    id: number; 

    broker_identifier: string;

    @IsNotEmpty()
    @IsString()
    address_line_one: string;

    @IsNotEmpty()
    @IsString()
    address_line_two: string;

    @IsNotEmpty()
    @IsString()
    zipcode: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    created_at: Date;

    updated_at: Date;
}