import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AccountModule } from '../account/account.module';
import { StripeModule } from '../stripe/stripe.module';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [StripeModule, AccountModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
