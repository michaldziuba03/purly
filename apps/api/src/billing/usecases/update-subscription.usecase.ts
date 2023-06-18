import { Plans, UserRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IUpdateSubscriptionCommand {
  billigId: string;
  plan: Plans;
}

@Injectable()
export class UpdateSubscription implements Usecase<IUpdateSubscriptionCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(command: IUpdateSubscriptionCommand) {
    return this.userRepository.update(
      {
        billingId: command.billigId,
      },
      {
        plan: command.plan,
      }
    );
  }
}
