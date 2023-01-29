import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeEvent, StripeEventSchema } from './stripe-event.schema';
import { StripeEventController } from './stripe-event.controller';
import { StripeModule } from '../stripe/stripe.module';
import { StripeEventService } from './stripe-event.service';
import { StripeEventRepository } from './stripe-event.repository';

@Module({
  imports: [
    StripeModule,
    MongooseModule.forFeature([
      { name: StripeEvent.name, schema: StripeEventSchema },
    ]),
  ],
  providers: [StripeEventService, StripeEventRepository],
  controllers: [StripeEventController],
  exports: [StripeEventService],
})
export class StripeEventModule {}
