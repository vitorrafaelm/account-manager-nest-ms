import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeormConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    EnvironmentConfigModule, 
    TypeormConfigModule, 
    RepositoriesModule, 
    ControllersModule, 
    UsecasesProxyModule.register()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
