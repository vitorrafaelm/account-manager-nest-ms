import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column('varchar')
    user_identifier: string;

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