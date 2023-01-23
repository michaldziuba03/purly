import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { createHash } from 'crypto';
import { CreateAccountDTO } from './dto';
import * as argon from 'argon2';
import { Account } from './account.schema';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  private generateGravatar(email: string) {
    const hash = createHash('md5').update(email).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  accountExists(email: string) {
    return this.accountRepository.exists({ email });
  }

  async createAccount(data: CreateAccountDTO) {
    const picture = this.generateGravatar(data.email);
    const hashedPassword = await argon.hash(data.password);
    return this.accountRepository.create({
      ...data,
      picture,
      password: hashedPassword,
    });
  }

  async findByEmailAndPass(email: string, password: string) {
    const account = await this.accountRepository.findOne({ email });
    if (!account) {
      return;
    }
    const areSame = await argon.verify(account.password, password);
    if (!areSame) {
      return;
    }

    return account;
  }

  findAccountById(accountId: string) {
    return this.accountRepository.findOneById(accountId);
  }

  updateAccountById(accountId: string, data: Partial<Account>) {
    return this.accountRepository.findOneAndUpdate({ _id: accountId }, data);
  }
}
