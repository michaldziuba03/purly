import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import { StripeEventModule } from '../stripe-event/stripe-event.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [
    StripeEventModule,
    PlanModule,
    MongooseModule.forFeature([{ schema: AccountSchema, name: Account.name }]),
  ],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
