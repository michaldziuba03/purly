import { Module } from '@nestjs/common';
import { StripeProvider } from './stripe/stripe.provider';
import { StripeWebhook } from './stripe/stripe.webhook';
import { CreateCheckout } from './usecases/create-checkout.usecase';
import { ManageBilling } from './usecases/manage-billing.usecase';
import { UpdatePlan } from './usecases/update-plan.usecase';
import { DeleteBillingInfo } from './usecases/delete-billing-info.usecase';
import { BillingController } from './billing.controller';

@Module({
  controllers: [StripeWebhook, BillingController],
  providers: [
    StripeProvider,
    CreateCheckout,
    ManageBilling,
    UpdatePlan,
    DeleteBillingInfo,
  ],
})
export class BillingModule {}
