import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AccountModule } from '../account/account.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule, AccountModule],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
