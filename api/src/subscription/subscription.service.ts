import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { Config } from 'src/config/config';
import Stripe from 'stripe'

@Injectable()
export class SubscriptionService {
    private readonly stripe: Stripe;

    constructor(
        private readonly config: Config,
        private readonly accountService: AccountService,
    ) {
        this.stripe = new Stripe(config.stripeKey, { apiVersion: null });
    }
    
    createCustomer() {}

    createSubscription() {}
}
