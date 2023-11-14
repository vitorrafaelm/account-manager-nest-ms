import { Global, Module } from '@nestjs/common';
import { UserCreatedPublishModule } from './publishers/user-created/user-created-publish.module';

@Global()
@Module({
    imports: [
        UserCreatedPublishModule
    ], 
    exports: [UserCreatedPublishModule]
})
export class RabbitmqModule {}
