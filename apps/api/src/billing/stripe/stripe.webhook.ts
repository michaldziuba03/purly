import {
  Controller,
  Post,
  RawBodyRequest,
  Headers,
  Req,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectStripe } from './stripe.provider';
import Stripe from 'stripe';
import { stripeEventName } from './stripe.event';

export enum StripeEvents {
  DeleteSubscription = 'customer.subscription.deleted',
  UpdateSubscription = 'customer.subscription.updated',
}

@Controller('stripe/webhook')
export class StripeWebhook {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly eventEmitter: EventEmitter2
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

    Logger.log('Received event: ' + event.type, StripeWebhook.name);
    // we use eventEmitter to decouple webhook and handling logic
    // emitAsync will wait for all responsens and eventually throw error - it works like Promise.all()
    await this.eventEmitter.emitAsync(
      stripeEventName(event.type as StripeEvents),
      event.data.object,
      event.id
    );
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
