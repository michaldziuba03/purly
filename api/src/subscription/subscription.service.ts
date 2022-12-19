import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { Config } from 'src/config/config';
import Stripe from 'stripe'
import { Plans } from './subscription.constants';

@Injectable()
export class SubscriptionService {
    private readonly stripe: Stripe;

    constructor(
        private readonly config: Config,
        private readonly accountService: AccountService,
    ) {
        this.stripe = new Stripe(config.stripeKey, { apiVersion: null });
    }
    
    async createCustomer(email: string) {
        const customer = await this.stripe.customers.create({ email });

        return customer.id;
    }

    async createSubscriptionSession(priceId: string, userId: string) {
        const account = await this.accountService.findById(userId);

        if (!account.customerId) {
            const customerId = await this.createCustomer(account.email);
            await this.accountService.saveCustomerId(userId, customerId);
            account.customerId = customerId;
        }

        const session = await this.stripe.checkout.sessions.create({
            customer: account.customerId,
            success_url: this.config.stripeSuccessUrl,
            cancel_url: this.config.stripeCancelUrl,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                { 
                    price: priceId,
                    quantity: 1,
                }
            ]
        });

        return session;
    }

    constructEvent(body: unknown, signature: string, webhookSecret: string) {
        return this.stripe.webhooks.constructEvent(body as Buffer, signature, webhookSecret);
    }

    private getPlan(productId: string) {
        switch (productId) {
            case this.config.basicPlanId:
                return Plans.BASIC;
            case this.config.proPlanId:
                return Plans.PRO;
        }
    }

    createSubscription(customerId: string, productId: string) {
        const plan = this.getPlan(productId);
        return this.accountService.saveSubscription(customerId, plan);
    }

    async manageSubscription(userId: string) {
        const account = await this.accountService.findById(userId);
        const billingPortal = await this.stripe.billingPortal.sessions.create({
            customer: account.customerId,
            return_url: this.config.stripeSuccessUrl,
        });

        return billingPortal;
    }
}
