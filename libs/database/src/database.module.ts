import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { UserRepository } from './user/user.repository';
import { WorkspaceRepository } from './workspace';

@Global()
@Module({
  controllers: [],
  providers: [DatabaseProvider, UserRepository, WorkspaceRepository],
  exports: [UserRepository, WorkspaceRepository],
})
export class DatabaseModule {}
