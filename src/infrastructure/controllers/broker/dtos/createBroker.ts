import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBroker {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    document_type: string;

    @IsNotEmpty()
    @IsString()
    document_number: string;

    @IsNotEmpty()
    @IsString()
    broker_identifier: string;

    @IsString()
    profile_picture: string;

    @IsNotEmpty()
    @IsString()
    account_status: string;
}