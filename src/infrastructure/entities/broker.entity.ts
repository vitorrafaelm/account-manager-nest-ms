import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity('brokers')
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
    identifier: string;

    @Column('text')
    profile_picture: string;

    @Column('varchar')
    account_status: string;

    @Column('text')
    iv: string;

    @Column('boolean')
    is_deleted: boolean;

    @OneToOne(() => Address, (address) => address.broker, { cascade: true })
    addresses: Address;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}