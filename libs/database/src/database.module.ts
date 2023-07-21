import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { DatabaseHealthIndicator } from './database.health';
import { UserRepository } from './user/user.repository';
import { WorkspaceRepository } from './workspace';
import { LinkRepository } from './link';
import { ReportRepository } from './report';
import { InviteRepository } from './invite';

@Global()
@Module({
  providers: [
    DatabaseProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
    ReportRepository,
    InviteRepository,
  ],
  exports: [
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
    ReportRepository,
    InviteRepository,
  ],
})
export class DatabaseModule {}
