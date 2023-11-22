import { Global, Module } from '@nestjs/common';
import { UserCreatedPublishModule } from './publishers/user-created/user-created-publish.module';
import { UserUpdatedPublishModule } from './publishers/user-updated/user-updated-publish.module';

@Global()
@Module({
    imports: [
        UserCreatedPublishModule, 
        UserUpdatedPublishModule
    ], 
    exports: [UserCreatedPublishModule, UserUpdatedPublishModule]
})
export class RabbitmqModule {}
