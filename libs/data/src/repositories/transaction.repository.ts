import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionDocument, Transaction> {
  constructor(@InjectModel(Transaction.name) transactionModel: Model<TransactionDocument>) {
    super(transactionModel, Transaction);
  }
}
