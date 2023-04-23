import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { TransactionSession } from './transaction.session';

export type TransactionCallback = (t: TransactionSession) => Promise<any>;

@Injectable()
export class TransactionManager {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  // shorthand for regular transactions:
  async transaction(callback: TransactionCallback) {
    const t = await this.create();
    let result;

    try {
      result = await callback(t);
      await this.commit(t);
    } catch (err) {
      await this.abort(t);
      await this.end(t);

      throw err;
    }

    await this.end(t);
    return result;
  }

  async create() {
    const session = await this.connection.startSession();
    session.startTransaction();

    return new TransactionSession(session);
  }

  async commit(t: TransactionSession) {
    await t.session.commitTransaction();
  }

  async abort(t: TransactionSession) {
    await t.session.abortTransaction();
  }

  async end(t: TransactionSession) {
    await t.session.endSession();
  }
}
