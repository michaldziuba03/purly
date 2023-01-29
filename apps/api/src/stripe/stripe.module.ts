import { Module } from '@nestjs/common';
import { StripeProvider } from './stripe.provider';

@Module({
  exports: [StripeProvider],
  providers: [StripeProvider],
})
export class StripeModule {}
