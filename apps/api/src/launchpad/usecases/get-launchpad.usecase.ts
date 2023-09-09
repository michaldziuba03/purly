import { Injectable, NotFoundException } from '@nestjs/common';
import { LaunchpadRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';

interface IGetLaunchpadCommand {
  workspaceId: string;
}

@Injectable()
export class GetLaunchpad implements Usecase<IGetLaunchpadCommand> {
  constructor(private readonly launchpadRepository: LaunchpadRepository) {}

  async execute(command: IGetLaunchpadCommand) {
    const page = await this.launchpadRepository.findByWorkspace(
      command.workspaceId
    );
    if (!page) {
      throw new NotFoundException('Bio page not found');
    }

    return page;
  }
}
