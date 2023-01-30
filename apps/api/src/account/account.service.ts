import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { createHash } from 'crypto';
import { CreateAccountDTO } from './dto';
import * as argon from 'argon2';
import { Account } from './account.schema';
import { StripeEventService } from '../stripe-event/stripe-event.service';
import Stripe from 'stripe';
import { TransactionSession } from '../database/transaction.manager';
import { PlanService } from '../plan/plan.service';

@Injectable()
export class AccountService implements OnModuleInit {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly planService: PlanService,
    private readonly stripeEvents: StripeEventService,
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
