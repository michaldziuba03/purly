import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { ManageSubscriptions } from './usecases/manage-subscriptions.usecase';
import { CreateCheckout } from './usecases/create-checkout.usecase';
import { StripeProvider } from './stripe/stripe.provider';
import { StripeWebhook } from './stripe/stripe.webhook';
import { UpdateSubscription } from './usecases/update-subscription.usecase';

@Module({
  controllers: [BillingController, StripeWebhook],
  providers: [
    StripeProvider,
    UpdateSubscription,
    ManageSubscriptions,
    CreateCheckout,
  ],
})
export class BillingModule {}
