import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Broker } from "./broker.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column('varchar')
    broker_identifier: string;

    @OneToOne(() => Broker, (broker) => broker.address)
    @JoinColumn({ name: 'broker_identifier' })
    broker: Broker;

    @Column('varchar')
    address_line_one: string;

    @Column('varchar')
    address_line_two: string;

    @Column('varchar')
    zipcode: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    state: string;

    @Column('text')
    country: string;

    @CreateDateColumn({ name: 'createdAt' })
    created_at: Date;

    @CreateDateColumn({ name: 'updatedAt' })
    updated_at: Date;
}