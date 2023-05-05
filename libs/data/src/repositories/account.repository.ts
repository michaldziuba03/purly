import { BaseRepository} from "./base.repository";
import { Account, AccountDocument, OAuthProviders } from "../schemas/account.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository extends BaseRepository<AccountDocument, Account> {
  constructor(
    @InjectModel(Account.name) accountModel: Model<AccountDocument>,
  ) {
    super(accountModel, Account);
  }

  findById(id: string) {
    return this.findOne({ _id: id });
  }

  findByIdAndUpdate(id: string, data: Partial<AccountDocument>) {
    return this.findOneAndUpdate({ _id: id }, data);
  }

  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findAndVerify(token: string) {
    return this.findOneAndUpdate({
      verificationToken: token,
      isVerified: false,
      verificationExpiration: {
        $gte: Date.now(),
      }
    }, {
      isVerified: true,
      $unset: {
        verificationToken: 1,
        verificationExpiration: 1,
      }
    })
  }

  findByFederatedAccount(provider: OAuthProviders, subject: string) {
    return this.findOne({
      'accounts.provider': provider,
      'accounts.subject': subject,
    });
  }

  createFederatedAccount(
    provider: OAuthProviders,
    subject: string,
    data: { email: string, name: string, picture: string }
  ) {
    return this.create({
      email: data.email,
      name: data.name,
      picture: data.picture,
      isVerified: true,
      accounts: [{ provider, subject }],
    });
  }

  connectFederatedAccount(provider: OAuthProviders, subject: string, userId: string) {
    return this.updateOne(
      { _id: userId },
      {
        $push: {
          accounts: { provider, subject },
        },
      },
    );
  }
}
