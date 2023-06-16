import {
  Controller,
  Post,
  RawBodyRequest,
  Headers,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectStripe } from './stripe.provider';
import Stripe from 'stripe';

export enum StripeEvents {
  DeleteSubscription = 'customer.subscription.deleted',
  UpdateSubscription = 'customer.subscription.updated',
}

@Controller('stripe/webhook')
export class StripeWebhook {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe
  ) {}

  private readonly relevantEvents = Object.values(StripeEvents);

  // webhook path is optional variable for webhook url obfuscation
  @Post(process.env.STRIPE_WEBHOOK_PATH)
  async webhook(
    @Req() req: RawBodyRequest<unknown>,
    @Headers('stripe-signature') signature?: string
  ) {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new NotFoundException();
    }

    if (!signature) {
      throw new BadRequestException('Missing signature');
    }

    const event = this.constructEvent(req.rawBody, signature);
    if (!event) {
      throw new BadRequestException('Invalid event or signature');
    }

    // just ignore irrelevant events and return 2xx status
    if (!this.relevantEvents.includes(event.type as StripeEvents)) {
      return;
    }

    // Handle event :)

    return;
  }

  private constructEvent(payload: Buffer, signature: string) {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return;
    }
  }
}
