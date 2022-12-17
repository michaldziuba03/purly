import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import argon2d from 'argon2';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.model';
import { CreateAccountDTO } from './dto/create-account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name)
        private readonly accountModel: Model<AccountDocument>
    ) {}

    async createAccount(data: CreateAccountDTO): Promise<Account> {
        const hashedPassword = await argon2d.hash(data.password);
        const account = new this.accountModel({
            password: hashedPassword,
            ...data
        });
        
        return account.save();
    }

    findByEmail(email: string) {
        return this.accountModel.findOne({ email }).lean();
    }
}
