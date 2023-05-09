import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { Account, AccountRepository } from '@libs/data';

@Injectable()
export class BillingService {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly accountRepository: AccountRepository,
  ) {}

  private async createCustomer(account: Account) {
    const customer = await this.stripe.customers.create({
      email: account.email,
      name: account.name,
      metadata: {
        accountId: account.id,
      },
    });

    return customer.id;
  }

  async subscribe(priceId: string, userId: string) {
    const account = await this.accountRepository.findById(userId);

    if (!account.billingId) {
      const customerId = await this.createCustomer(account);
      await this.accountRepository.updateOne(
        { _id: account.id },
        { billingId: customerId },
      );
      account.billingId = customerId;
    }

    const session = await this.stripe.checkout.sessions.create({
      customer: account.billingId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/app/billing?state=success',
      cancel_url: 'http://localhost:3000/app/billing?state=cancel',
    });

    return session;
  }

  async manage(userId: string) {
    const account = await this.accountRepository.findById(userId);
    if (!account.billingId) {
      throw new BadRequestException('Account has not assigned billing id');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: account.billingId,
      return_url: 'http://localhost:3000/app/billing',
    });

    return session;
  }
}
