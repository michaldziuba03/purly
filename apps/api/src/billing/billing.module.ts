import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  providers: [BillingService],
  controllers: [BillingController],
})
export class BillingModule {}
