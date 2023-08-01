import { Pool } from 'pg';
import { Global, Module, OnApplicationShutdown, Logger } from '@nestjs/common';
import { DatabaseProvider } from './providers/database.provider';
import { DatabaseHealthIndicator } from './providers/database.health';
import { UserRepository } from './entities/user';
import { WorkspaceRepository } from './entities/workspace';
import { MemberRepository } from './entities/member';
import { LinkRepository } from './entities/link';
import { ReportRepository } from './entities/report';
import { InviteRepository } from './entities/invite';
import { ModuleRef } from '@nestjs/core';
import {
  ConnectionProvider,
  injectConnectionToken,
} from './providers/connection.provider';
import { BioRepository } from './entities/bio';

@Global()
@Module({
  providers: [
    ConnectionProvider,
    DatabaseProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    MemberRepository,
    LinkRepository,
    ReportRepository,
    InviteRepository,
    BioRepository,
  ],
  exports: [
    ConnectionProvider,
    DatabaseHealthIndicator,
    UserRepository,
    WorkspaceRepository,
    MemberRepository,
    LinkRepository,
    ReportRepository,
    InviteRepository,
    BioRepository,
  ],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown() {
    const conn = this.moduleRef.get<Pool>(injectConnectionToken());
    Logger.log('Closing database connection...', DatabaseModule.name);

    await conn.end();
  }
}
