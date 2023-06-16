import { Inject, Provider } from '@nestjs/common';
import Stripe from 'stripe';

export const STRIPE_CLIENT = 'STRIPE_CLIENT';

export const StripeProvider: Provider = {
  provide: STRIPE_CLIENT,
  useValue: new Stripe(process.env['STRIPE_SECRET'], {
    apiVersion: '2022-11-15',
  }),
};

export const InjectStripe = () => Inject(STRIPE_CLIENT);
