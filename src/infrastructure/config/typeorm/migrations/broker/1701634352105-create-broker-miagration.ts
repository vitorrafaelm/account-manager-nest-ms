import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBrokerMiagration1701634352105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'brokers', 
                columns: [
                    {
                        name: 'id', 
                        type: 'int', 
                        isPrimary: true, 
                        generationStrategy: 'increment', 
                        isGenerated: true
                    }, 
                    {
                        name: 'identifier', 
                        type: 'uuid', 
                        isPrimary: false
                    }, 
                    {
                        name: 'name', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'email', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'password', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'document_type', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'document_number', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'profile_picture', 
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
                        name: 'account_status', 
                        type: 'varchar', 
                        isPrimary: false
                    }, 
                    {
                        name: 'iv', 
                        type: 'varchar', 
                        isPrimary: false
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('brokers');
    }

}
