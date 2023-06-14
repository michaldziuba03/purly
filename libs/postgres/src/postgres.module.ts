import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { UserRepository } from './repositories/user.repository';
import { Link } from './entities/link.entity';
import { LinkRepository } from './repositories/link.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env['POSTGRES_URI'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Account, Link]),
  ],
  providers: [UserRepository, LinkRepository],
  exports: [UserRepository, LinkRepository],
})
export class PostgresModule {}
