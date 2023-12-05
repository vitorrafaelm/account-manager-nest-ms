import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateAddressMiagration1701634835083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'addresses',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true
                    },
                    {
                        name: 'broker_id',
                        type: 'int',
                        isPrimary: false
                    },
                    {
                        name: 'broker_identifier',
                        type: 'uuid',
                        isPrimary: false
                    },
                    {
                        name: 'address_line_one',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'address_line_two',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'zipcode',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isPrimary: false
                    },
                    {
                        name: 'is_deleted',
                        type: 'boolean',
                        isPrimary: false, 
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKAddress',
                        referencedTableName: 'brokers',
                        referencedColumnNames: ['id'],
                        columnNames: ['broker_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL',
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses');
    }

}
