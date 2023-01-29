import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AccountModule } from '../account/account.module';
import { StripeModule } from '../stripe/stripe.module';
import { StripeEventModule } from '../stripe-event/stripe-event.module';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [StripeModule, StripeEventModule, AccountModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
