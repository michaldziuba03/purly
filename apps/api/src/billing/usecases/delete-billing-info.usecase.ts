import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkspaceRepository } from '@purly/database';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { Usecase } from '../../shared/base.usecase';

interface IDeleteBillingInfoCommand {
  workspaceId: string;
}

@Injectable()
export class DeleteBillingInfo implements Usecase<IDeleteBillingInfoCommand> {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async execute(command: IDeleteBillingInfoCommand) {
    const workspace = await this.workspaceRepository.findById(
      command.workspaceId
    );
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (!workspace.billingId) {
      throw new BadRequestException('Workspace has no billing info');
    }

    await this.stripe.customers.del(workspace.billingId);

    await this.workspaceRepository.updateById(command.workspaceId, {
      billingId: null,
    });
  }
}
