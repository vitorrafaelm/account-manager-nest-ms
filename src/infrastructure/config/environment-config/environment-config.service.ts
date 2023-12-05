import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/DatabaseConfig';
import { JWTConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
    constructor(private configService: ConfigService) { }

    getInitVectorKey(): string {
        return this.configService.get<string>('INIT_VECTOR');
    }

    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
    }
    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }
    getDatabaseUser(): string {
        return this.configService.get<string>('DATABASE_USER');
    }
    getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
    }
    getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
    }
    getDatabaseSchema(): string {
        return this.configService.get<string>('DATABASE_SCHEMA');
    }
    getDatabaseSync(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
    }
    getEncryptKey(): string {
        return this.configService.get<string>('ENCRYPT_KEY');
    }

    getJwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }

    getJwtExpirationTime(): string {
        return this.configService.get<string>('JWT_EXPIRATION_TIME');
    }
}
