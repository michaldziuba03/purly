import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { InjectStripe } from '../stripe/stripe.provider';
import { StripeEventService } from '../stripe-event/stripe-event.service';
import { TransactionSession } from '../database/transaction.manager';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService implements OnModuleInit {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly accountService: AccountService,
    private readonly stripeEvents: StripeEventService,
  ) {}

  onModuleInit() {
    this.stripeEvents.subscribeEvent(
      'customer.subscription.updated',
      this.handleSubscriptionUpdated.bind(this),
    );
  }

  handleSubscriptionUpdated(event: Stripe.Event, t: TransactionSession) {
    console.log('HANDLE SUBSCRIPTION UPDATED:', event);
  }

  async createCustomer(email: string) {
    const customer = await this.stripe.customers.create({ email });
    return customer.id;
  }

  async createCheckoutSession(accountId: string, priceId: string) {
    const account = await this.accountService.findAccountById(accountId);
    if (!account) {
      throw new Error('Critical error'); // should be actually impossible
    }

    if (!account.billingId) {
      const billingId = await this.createCustomer(account.email);
      await this.accountService.updateAccountById(accountId, { billingId });
      account.billingId = billingId;
    }

    const checkout = await this.stripe.checkout.sessions.create({
      customer: account.billingId,
      mode: 'subscription',
      success_url: 'http://localhost:3000', // TODO: remove that hard coded client URL
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        accountId,
        email: account.email,
      },
    });

    return {
      id: checkout.id,
      url: checkout.url,
    };
  }

  async createBillingPortalSession(accountId: string) {
    const account = await this.accountService.findAccountById(accountId);
    if (!account) {
      throw new Error('Critical error');
    }

    if (!account.billingId) {
      return;
    }

    const billingPortal = await this.stripe.billingPortal.sessions.create({
      customer: account.billingId,
    });

    return {
      id: billingPortal.id,
      url: billingPortal.url,
    };
  }
}
