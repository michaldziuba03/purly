import {
  BadRequestException,
  Controller,
  Headers,
  NotFoundException,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from './stripe.provider';
import { Config } from '../config/config';
import { StripeEvents } from './stripe.utils';
import { StripeService } from './stripe.service';

@Controller('/stripe/webhook')
export class StripeWebhookHandler {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly config: Config,
    private readonly stripeService: StripeService,
  ) {}

  private readonly relevantEvents = Object.values(StripeEvents);

  @Post()
  async handle(
    @Req() req: RawBodyRequest<unknown>,
    @Headers('stripe-signature') signature?: string,
  ) {
    if (!this.config.stripeWebhookSecret) {
      throw new NotFoundException();
    }

    if (!signature) {
      throw new BadRequestException('Missing signature');
    }

    const evt = this.constructEvent(req.rawBody, signature);
    if (!evt) {
      throw new BadRequestException('Invalid event or signature');
    }

    // just ignore irrelevant events and return 2xx status
    if (!this.relevantEvents.includes(evt.type as StripeEvents)) {
      return;
    }

    // handle event is supposed to throw errors in case of failure
    await this.stripeService.handleEvent(evt);

    return;
  }

  private constructEvent(payload: Buffer, signature: string) {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.config.stripeWebhookSecret,
      );
    } catch (err) {
      return;
    }
  }
}
