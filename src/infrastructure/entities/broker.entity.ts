import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Broker {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column('varchar')
    document_type: string;

    @Column('varchar')
    document_number: string;

    @Column('varchar')
    broker_identifier: string;

    @Column('text')
    profile_picture: string;

    @Column('varchar')
    account_status: string;

    @OneToOne(() => Address, (address) => address.broker, { cascade: true })
    address: Address;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
}