import { Inject, Provider } from '@nestjs/common';
import { Config } from '../config/config';
import Stripe from 'stripe';

export const STRIPE_PROVIDER_TOKEN = 'STRIPE_CLIENT';

export const StripeProvider: Provider = {
  inject: [Config],
  provide: STRIPE_PROVIDER_TOKEN,
  useFactory: (config: Config) => {
    return new Stripe(config.stripeSecret, {
      apiVersion: '2022-11-15',
    });
  },
};

export const InjectStripe = () => Inject(STRIPE_PROVIDER_TOKEN);
