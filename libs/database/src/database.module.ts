import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { UserRepository } from './user/user.repository';
import { WorkspaceRepository } from './workspace';
import { DatabaseHealthIndicator } from './database.health';

@Global()
@Module({
  controllers: [],
  providers: [
    DatabaseProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
  ],
  exports: [DatabaseHealthIndicator, UserRepository, WorkspaceRepository],
})
export class DatabaseModule {}
