import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseBrokerRepository } from './broker.repository';

import { Broker } from '../entities/broker.entity';
import { Address } from 'src/domain/models/address';

@Module({
    imports: [TypeormConfigModule, TypeOrmModule.forFeature([Broker, Address])], 
    providers: [DatabaseBrokerRepository], 
    exports: [DatabaseBrokerRepository]
})
export class RepositoriesModule {}
