import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { UserRepository } from './repositories/user.repository';
import { Link } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';
import { ReportRepository } from './repositories/report.repository';
import { Report } from './entities/report.entity';
import { Bio } from './entities/bio.entity';
import { BioRepository } from './repositories/bio.repository';
import { BioBlock } from './entities/bio-block.entity';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceRepository } from './repositories/workspace.repository';
import { Member } from './entities/member.entity';
import { MemberRepository } from './repositories/member.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env['POSTGRES_URI'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Account,
      Link,
      Report,
      Bio,
      BioBlock,
      Workspace,
      Member,
    ]),
  ],
  providers: [
    UserRepository,
    LinkRepository,
    ReportRepository,
    BioRepository,
    WorkspaceRepository,
    MemberRepository,
  ],
  exports: [
    UserRepository,
    LinkRepository,
    ReportRepository,
    BioRepository,
    WorkspaceRepository,
    MemberRepository,
  ],
})
export class PostgresModule {}
