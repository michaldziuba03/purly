import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { UserRepository } from './user/user.repository';
import { DatabaseHealthIndicator } from './database.health';
import { WorkspaceRepository } from './workspace';
import { LinkRepository } from './link';

@Global()
@Module({
  controllers: [],
  providers: [
    DatabaseProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
  ],
  exports: [
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
  ],
})
export class DatabaseModule {}
