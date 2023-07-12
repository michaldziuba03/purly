import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { UserRepository } from './user/user.repository';

@Global()
@Module({
  controllers: [],
  providers: [DatabaseProvider, UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
