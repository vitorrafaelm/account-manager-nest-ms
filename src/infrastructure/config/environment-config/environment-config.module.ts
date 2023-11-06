import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';

console.log(process.env, '--------------------')

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: './env/local.env',
        ignoreEnvFile: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' ? false : true,
        isGlobal: true
      }),
    ],
    providers: [EnvironmentConfigService],
    exports: [EnvironmentConfigService],
  })
export class EnvironmentConfigModule {}
