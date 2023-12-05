import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Broker } from "./broker.entity";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column('int')
    broker_id: Number;

    @Column('varchar')
    broker_identifier: string;

    @OneToOne(() => Broker, (broker) => broker.addresses)
    @JoinColumn({ name: 'broker_id' })
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

    @Column('boolean')
    is_deleted: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}