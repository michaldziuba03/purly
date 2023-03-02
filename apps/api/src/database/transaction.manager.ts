import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

export class TransactionSession {
  constructor(public session: ClientSession) {}
}

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
    try {
      const result = await callback(t);
      await this.commit(t);
      await this.end(t);

      return result;
    } catch (err) {
      await this.abort(t);
      await this.end(t);

      throw err;
    }
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
