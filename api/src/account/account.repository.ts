import { EntityRepository } from '../database/entity.repository';
import { Account, AccountDocument } from './account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends EntityRepository<AccountDocument> {
  constructor(@InjectModel(Account.name) accountModel: Model<AccountDocument>) {
    super(accountModel);
  }
}
