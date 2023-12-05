import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeormConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { RabbitmqModule } from './infrastructure/rabbitmq/rabbitmq.module';
import { CryptoModule } from './infrastructure/commom/utils/crypto/crypto.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/commom/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret,
    }),
    EnvironmentConfigModule, 
    TypeormConfigModule, 
    RepositoriesModule, 
    ControllersModule, 
    UsecasesProxyModule.register(), 
    RabbitmqModule, 
    CryptoModule, 
    JwtServiceModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
