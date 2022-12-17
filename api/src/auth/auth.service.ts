import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDTO } from 'src/account/dto/create-account.dto';
import { LoginDTO } from './dto/login.dto';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService
    ) {}

    async register(data: CreateAccountDTO) {
        const account = await this.accountService.createAccount(data);
        return {
            id: account.id,
            name: account.name,
        }
    }

    async login(data: LoginDTO) {
        const account = await this.accountService.findByEmail(data.email);

        const areSame = await argon2.verify(account.password, data.password);
        if (!areSame) {
            return;
        }

        return { 
            id: account._id,
            name: account.name,
         };
    }
}
