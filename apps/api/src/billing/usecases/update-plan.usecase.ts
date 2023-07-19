import { WorkspaceRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';
import { Plans } from '../stripe/stripe.constants';

interface IUpdatePlanCommand {
  billingId: string;
  plan: Plans;
}

@Injectable()
export class UpdatePlan implements Usecase<IUpdatePlanCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  execute(command: IUpdatePlanCommand) {
    return this.workspaceRepository.updatePlan(command.billingId, command.plan);
  }
}
