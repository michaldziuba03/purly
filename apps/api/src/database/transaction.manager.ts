import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

export class TransactionSession {
  constructor(public session: ClientSession) {}
}

@Injectable()
export class TransactionManager {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

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
