import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.model';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([ 
      { name: Account.name, schema: AccountSchema }
    ])
  ],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
