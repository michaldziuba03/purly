import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { UserRepository } from '@purly/postgres';
import Stripe from 'stripe';
import { InjectStripe } from '../stripe/stripe.provider';
import { createClientUrl } from '../../shared/utils';

interface IManageSubscriptionsCommand {
  userId: string;
}

@Injectable()
export class ManageSubscriptions
  implements Usecase<IManageSubscriptionsCommand>
{
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: IManageSubscriptionsCommand) {
    const account = await this.userRepository.findById(command.userId);
    if (!account.billingId) {
      throw new BadRequestException('Account has not assigned billing id');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: account.billingId,
      return_url: createClientUrl('/app/billing'),
    });

    return session;
  }
}
