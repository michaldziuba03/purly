import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateAccountDTO } from '../account/dto';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  async register(data: CreateAccountDTO) {
    const alreadyExists = await this.accountService.accountExists(data.email);
    if (alreadyExists) {
      return;
    }

    return this.accountService.createAccount(data);
  }
}
