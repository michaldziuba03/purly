import { Injectable } from '@nestjs/common';
import {
  TransactionManager,
  TransactionRepository,
  TransactionSession,
} from '@libs/data';

type IdempotentCallback = (trx: TransactionSession) => any;

interface GenericEvent {
  id: string;
  type: string;
  payload: object;
}

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async runOnce(event: GenericEvent, cb: IdempotentCallback) {
    const trx = await this.transactionManager.create();

    try {
      await this.transactionRepository.create(
        {
          eventId: event.id,
          eventType: event.type,
          payload: event.payload,
        },
        {
          trx,
        },
      );

      const result = await cb(trx);

      await this.transactionManager.commit(trx);
      await this.transactionManager.end(trx);

      return result;
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
