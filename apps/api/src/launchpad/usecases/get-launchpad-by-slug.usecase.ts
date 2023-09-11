import { LaunchpadRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';

interface IGetLaunchpadBySlugCommand {
  slug: string;
}

@Injectable()
export class GetLaunchpadBySlug implements Usecase<IGetLaunchpadBySlugCommand> {
  constructor(private readonly launchpadRepository: LaunchpadRepository) {}

  async execute(command: IGetLaunchpadBySlugCommand) {
    const launchpad = await this.launchpadRepository.findBySlug(command.slug);
    if (!launchpad) {
      throw new NotFoundException();
    }

    return launchpad;
  }
}
