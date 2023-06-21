import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { UserRepository } from './repositories/user.repository';
import { Link } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';
import { ReportRepository } from './repositories/report.repository';
import { Report } from './entities/report.entity';
import { Bio, BioBlock } from './entities/bio.entity';
import { BioRepository } from './repositories/bio.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env['POSTGRES_URI'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Account, Link, Report, Bio, BioBlock]),
  ],
  providers: [UserRepository, LinkRepository, ReportRepository, BioRepository],
  exports: [UserRepository, LinkRepository, ReportRepository, BioRepository],
})
export class PostgresModule {}
