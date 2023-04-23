import { ClientSession } from "mongoose";

export class TransactionSession {
  constructor(public session: ClientSession) {}
}
