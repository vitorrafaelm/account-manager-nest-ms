import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';

@Module({
  providers: [CryptoService],
  exports: [CryptoService], 
  imports: [EnvironmentConfigModule ], 
})
export class CryptoModule {}
