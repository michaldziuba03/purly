import { Injectable } from '@nestjs/common';
import {
  TransactionManager,
  TransactionSession,
} from '../database/transaction.manager';
import { StripeEventRepository } from './stripe-event.repository';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { Config } from '../config/config';

export type StripeEventHandler = (
  event: Stripe.Event,
  t: TransactionSession,
) => Promise<void> | void;

@Injectable()
export class StripeEventService {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly config: Config,
    private readonly transactionManager: TransactionManager,
    private readonly eventRepository: StripeEventRepository,
  ) {}

  private readonly handlers = new Map<string, StripeEventHandler>(); // map event to specific handler

  subscribeEvent(eventType: string, handler: StripeEventHandler) {
    if (this.handlers.has(eventType)) {
      throw new Error('You can have only one handler for specific event');
    }
    this.handlers.set(eventType, handler);
  }

  async handleEvent(event: Stripe.Event) {
    const handler = this.handlers.get(event.type);
    if (!handler) {
      return;
    }

    const t = await this.transactionManager.create();
    try {
      await this.eventRepository.create(
        {
          eventId: event.id,
          eventType: event.type,
          payload: event,
        },
        { transaction: t },
      );

      await handler(event, t);
      await this.transactionManager.commit(t);
      await this.transactionManager.end(t);
    } catch (err) {
      await this.transactionManager.abort(t);
      await this.transactionManager.end(t);
      this.handleFailure(err);
    }
  }

  handleFailure(err: any) {
    if (
      err.name === 'MongoServerError' &&
      err.code === 11000 &&
      err.keyValue.eventId
    ) {
      // ignore error because this event is already processed.
      console.log(err);
    } else {
      throw err;
    }
  }

  constructEvent(body: Buffer, signature: string) {
    try {
      return this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.config.stripeWebhookSecret,
      );
    } catch (err) {
      return;
    }
  }
}
