import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@libs/data';
import { UpdateAccountDTO } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  getAccount(userId: string) {
    return this.accountRepository.findById(userId);
  }

  updateAccount(userId: string, data: UpdateAccountDTO) {
    return this.accountRepository.findByIdAndUpdate(userId, data);
  }
}
