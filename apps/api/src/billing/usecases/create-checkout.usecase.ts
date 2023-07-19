import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { WorkspaceRepository } from '@purly/database';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { createClientUrl } from '../../shared/utils';
import { Plans, getPriceIdByName } from '../stripe/stripe.constants';

interface ICreateCheckoutCommand {
  workspaceId: string;
  plan: Plans;
}

@Injectable()
export class CreateCheckout implements Usecase<ICreateCheckoutCommand> {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async execute(command: ICreateCheckoutCommand): Promise<string> {
    const workspace = await this.workspaceRepository.findById(
      command.workspaceId
    );
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (workspace.plan !== Plans.FREE) {
      throw new BadRequestException(
        'This Workspace has active subscription. Use /manage to updage subscription status.'
      );
    }

    if (!workspace.billingId) {
      const billingId = await this.createCustomer(command.workspaceId, {
        name: workspace.name,
        email: workspace.billingEmail,
      });

      await this.workspaceRepository.updateById(command.workspaceId, {
        billingId,
      });

      workspace.billingId = billingId;
    }

    const priceId = getPriceIdByName(command.plan);
    const checkoutSession = await this.stripe.checkout.sessions.create({
      customer: workspace.billingId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: createClientUrl('/app/billing?state=success'),
      cancel_url: createClientUrl('/app/billing?state=cancel'),
      client_reference_id: workspace.id,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          plan: command.plan,
        },
      },
    });

    return checkoutSession.url;
  }

  private async createCustomer(
    workspaceId: string,
    data: { name: string; email: string }
  ) {
    const customer = await this.stripe.customers.create({
      email: data.email,
      name: data.name,
      metadata: {
        workspaceId,
      },
    });

    return customer.id;
  }
}
