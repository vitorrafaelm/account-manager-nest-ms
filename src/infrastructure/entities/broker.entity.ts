import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
}