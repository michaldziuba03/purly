import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { ManageSubscriptions } from './usecases/manage-subscriptions.usecase';
import { CreateCheckout } from './usecases/create-checkout.usecase';

@Module({
  controllers: [BillingController],
  providers: [ManageSubscriptions, CreateCheckout],
})
export class BillingModule {}
