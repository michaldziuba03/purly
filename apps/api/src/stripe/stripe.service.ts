import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { TransactionManager, TransactionRepository } from '@libs/data';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createEventName } from './stripe.utils';

@Injectable()
export class StripeService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionManager: TransactionManager,
    private readonly emitter: EventEmitter2,
  ) {}

  async handleEvent(evt: Stripe.Event) {
    const trx = await this.transactionManager.create();
    try {
      await this.transactionRepository.create(
        {
          eventId: evt.id,
          eventType: evt.type,
          payload: evt.data.object,
        },
        {
          trx,
        },
      );
      // returns array of resolved values from listeners
      await this.emitter.emitAsync(
        createEventName(evt.type),
        evt.data.object,
        trx,
      );

      await this.transactionManager.commit(trx);
      await this.transactionManager.end(trx);
    } catch (err) {
      await this.transactionManager.abort(trx);
      await this.transactionManager.end(trx);
      this.handleFailure(err);
    }
  }

  private handleFailure(err: any) {
    if (
      err.name === 'MongoServerError' &&
      err.code === 11000 &&
      err.keyValue.eventId
    ) {
      // ignore error because this event is already processed.
      console.error(err);
    } else {
      throw err;
    }
  }
}
