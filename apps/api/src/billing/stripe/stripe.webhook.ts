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
import { InjectStripe } from './stripe.provider';
import Stripe from 'stripe';
import { UpdateSubscription } from '../usecases/update-subscription.usecase';
import { Plans } from '@purly/postgres';
import { getNameByPriceId } from './stripe.constants';

export enum StripeEvents {
  DeleteSubscription = 'customer.subscription.deleted',
  UpdateSubscription = 'customer.subscription.updated',
}

@Controller('stripe/webhook')
export class StripeWebhook {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly updateSubscriptionUsecase: UpdateSubscription
  ) {}

  private readonly relevantEvents = Object.values(StripeEvents);

  dispatchEvent(event: Stripe.Event) {
    Logger.log(`Received event: ${event.type}`, StripeWebhook.name);
    const data = event.data.object as Stripe.Subscription;

    switch (event.type) {
      case StripeEvents.UpdateSubscription:
        return this.updateSubscriptionUsecase.execute({
          billigId: data.customer.toString(),
          plan: this.getPlanForSubscription(data),
        });
      case StripeEvents.DeleteSubscription:
        return this.updateSubscriptionUsecase.execute({
          billigId: data.customer.toString(),
          plan: Plans.FREE,
        });
    }
  }

  private getPlanForSubscription(payload: Stripe.Subscription) {
    const priceId = payload.items.data[0].price.id;
    if (!priceId) {
      // log and report case like this.
      throw new BadRequestException('Price ID is required');
    }

    return getNameByPriceId(priceId);
  }

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

    await this.dispatchEvent(event);
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
