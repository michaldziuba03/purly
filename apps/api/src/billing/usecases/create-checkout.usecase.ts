import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { Plans, User, UserRepository } from '@purly/postgres';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { createClientUrl } from '../../shared/utils';

interface ICreateCheckoutCommand {
  userId: string;
  priceId: string;
}

@Injectable()
export class CreateCheckout implements Usecase<ICreateCheckoutCommand> {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: ICreateCheckoutCommand): Promise<string> {
    const user = await this.userRepository.findById(command.userId);
    if (user.plan !== Plans.FREE) {
      throw new BadRequestException(
        'User has active subscription. Use /manage.'
      );
    }

    if (!user.billingId) {
      const billingId = await this.createCustomer(user);
      await this.userRepository.update(
        { id: user.id },
        {
          billingId,
        }
      );

      user.billingId = billingId;
    }

    const checkoutSession = await this.stripe.checkout.sessions.create({
      customer: user.billingId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: command.priceId, quantity: 1 }],
      success_url: createClientUrl('/app/billing?state=success'),
      cancel_url: createClientUrl('/app/billing?state=cancel'),
    });

    return checkoutSession.url;
  }

  private async createCustomer(user: User) {
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: user.id,
      },
    });

    return customer.id;
  }
}
