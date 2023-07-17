import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { UserRepository } from './user/user.repository';
import { DatabaseHealthIndicator } from './database.health';
import { WorkspaceRepository } from './workspace';
import { LinkRepository } from './link';
import { ReportRepository } from './report';

@Global()
@Module({
  controllers: [],
  providers: [
    DatabaseProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
    ReportRepository,
  ],
  exports: [
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    LinkRepository,
    ReportRepository,
  ],
})
export class DatabaseModule {}
