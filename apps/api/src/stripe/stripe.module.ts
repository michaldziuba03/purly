import { Module } from '@nestjs/common';
import { StripeProvider } from './stripe.provider';
import { StripeWebhookHandler } from './stripe.webhook';
import { StripeService } from './stripe.service';

@Module({
  exports: [StripeProvider],
  providers: [StripeProvider, StripeService],
  controllers: [StripeWebhookHandler],
})
export class StripeModule {}
