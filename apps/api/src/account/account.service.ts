import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { createHash } from 'crypto';
import { CreateAccountDTO, ResetPasswordDTO } from './dto';
import * as argon from 'argon2';
import { OAuthProvider } from './account.constants';
import { StripeEventService } from '../stripe-event/stripe-event.service';
import Stripe from 'stripe';
import {
  TransactionManager,
  TransactionSession,
} from '../database/transaction.manager';
import { PlanService } from '../plan/plan.service';
import { Account } from './account.schema';
import { OAuthData } from './account.types';
import { TokenService } from '../token/token.service';

@Injectable()
export class AccountService implements OnModuleInit {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly planService: PlanService,
    private readonly stripeEvents: StripeEventService,
    private readonly tokenService: TokenService,
    private readonly transactionManager: TransactionManager,
  ) {}

  onModuleInit() {
    this.stripeEvents.subscribeEvent(
      'customer.subscription.updated',
      this.updateSubscriptionStatus.bind(this),
    );

    this.stripeEvents.subscribeEvent(
      'customer.subscription.deleted',
      this.clearSubscriptionStatus.bind(this),
    );
  }

  async updateSubscriptionStatus(event: Stripe.Event, t: TransactionSession) {
    const subscription = event.data.object as Stripe.Subscription & {
      plan: Stripe.Plan;
    };
    const plan = await this.planService.getNameByProductId(
      subscription.plan.product as string,
    );
    await this.accountRepository.findOneAndUpdate(
      {
        billingId: subscription.customer,
      },
      {
        plan,
      },
      { transaction: t },
    );
  }

  async clearSubscriptionStatus(event: Stripe.Event, t: TransactionSession) {
    const subscription = event.data.object as Stripe.Subscription;
    await this.accountRepository.findOneAndUpdate(
      { billingId: subscription.customer },
      {
        plan: null,
      },
      {
        transaction: t,
      },
    );
  }

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

  async findByEmail(email: string) {
    return this.accountRepository.findOne({ email });
  }

  async findByEmailAndPass(email: string, password: string) {
    const account = await this.accountRepository.findOne({ email });
    if (!account) {
      return;
    }
    // when user register with social login, password will be undefined
    if (!account.password) {
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

  findByFederatedAccount(provider: OAuthProvider, subject: string) {
    return this.accountRepository.findOne({
      'accounts.provider': provider,
      'accounts.subject': subject,
    });
  }

  async connectFederatedAccount(
    provider: OAuthProvider,
    subject: string,
    data: OAuthData,
  ) {
    const { email, name, picture } = data;
    const user = await this.findByEmail(email);
    // pre-account takeover prevention:
    if (user && !user.isVerified) {
      return;
    }

    if (user) {
      await this.accountRepository.updateOne(
        { _id: user._id },
        {
          $push: {
            accounts: { provider, subject },
          },
        },
      );

      return user;
    }

    return this.accountRepository.create({
      email,
      name,
      picture,
      isVerified: true,
      accounts: [{ provider, subject }],
    });
  }

  async verifyAccount(token: string) {
    const tokenExists = await this.tokenService.checkVerificationToken(token);
    if (!tokenExists) {
      throw new NotFoundException();
    }

    await this.transactionManager.transaction(async (t) => {
      const tokenMeta = await this.tokenService.consumeVerificationToken(
        token,
        t,
      );

      if (!tokenMeta) {
        throw new NotFoundException();
      }

      await this.accountRepository.updateOne(
        { _id: tokenMeta.userId },
        { isVerified: true },
        { transaction: t },
      );
    });
  }

  async resetPassword(data: ResetPasswordDTO) {
    const token = await this.tokenService.checkResetToken(data.token);
    if (!token) {
      throw new BadRequestException('Invalid reset password token');
    }

    await this.transactionManager.transaction(async (t) => {
      const tokenMeta = await this.tokenService.consumeResetToken(token, t);
      if (!tokenMeta) {
        throw new BadRequestException('Invalid reset password token');
      }

      const hashedPassword = await argon.hash(data.password);
      await this.accountRepository.updateOne(
        { _id: tokenMeta.userId },
        { password: hashedPassword },
        { transaction: t },
      );
    });
  }
}
