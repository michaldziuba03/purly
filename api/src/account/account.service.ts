import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import argon2 from 'argon2';
import crypto from 'crypto';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.model';
import { CreateAccountDTO } from './dto/create-account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name)
        private readonly accountModel: Model<AccountDocument>
    ) {}

    private generateGravatar(email: string) {
        const hash = crypto.createHash('md5').update(email).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}`;
    }

    async createAccount(data: CreateAccountDTO): Promise<Account> {
        const picture = this.generateGravatar(data.email);
        const hashedPassword = await argon2.hash(data.password);
        const account = new this.accountModel({
            picture,
            email: data.email,
            name: data.name,
            password: hashedPassword,
        });
        
        return account.save();
    }

    async accountExists(email: string): Promise<boolean> {
        return Boolean(await this.accountModel.exists({ email }).lean());
    }

    updateAccount(userId: string, data: Partial<Account>) {
        return this.accountModel.updateOne({ id: userId }, data);
    }

    findByEmail(email: string) {
        return this.accountModel.findOne({ email }).lean();
    }

    findById(userId: string) {
        return this.accountModel.findById(userId).lean();
    }

    saveCustomerId(userId: string, customerId: string) {
        return this.accountModel.updateOne({ id: userId }, { customerId });
    }
}
