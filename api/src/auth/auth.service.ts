import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDTO } from 'src/account/dto/create-account.dto';
import { LoginDTO } from './dto/login.dto';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { Config } from 'src/config/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: Config,
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) {}

    async register(data: CreateAccountDTO) {
        const alreadyExists = await this.accountService.accountExists(data.email);
        if (alreadyExists) {
            return;
        }
        
        try {
            const account = await this.accountService.createAccount(data);
            
            return {
                id: account.id,
                name: account.name,
            }
        } catch (err) {
            if (err.name === "MongoServerError" && err.code === 11000) {
                return;
            }

            throw err;
        }
    }

    async login(data: LoginDTO) {
        const account = await this.accountService.findByEmail(data.email);
        if (!account) {
            return;
        }

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
