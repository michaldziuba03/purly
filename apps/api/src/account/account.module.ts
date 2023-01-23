import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: AccountSchema, name: Account.name }]),
  ],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
