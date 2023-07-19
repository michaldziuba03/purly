import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { WorkspaceRepository } from '@purly/database';
import Stripe from 'stripe';
import { InjectStripe } from '../stripe/stripe.provider';
import { createClientUrl } from '../../shared/utils';

interface IManageBillingCommand {
  workspaceId: string;
}

@Injectable()
export class ManageBilling implements Usecase<IManageBillingCommand> {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async execute(command: IManageBillingCommand) {
    const workspace = await this.workspaceRepository.findById(
      command.workspaceId
    );
    if (!workspace.billingId) {
      throw new BadRequestException('Account has not assigned billing id');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: workspace.billingId,
      return_url: createClientUrl('/app/billing'),
    });

    return session.url;
  }
}
