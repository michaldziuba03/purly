import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { LaunchpadRepository, isDuplicatedError } from '@purly/database';

interface ICreateLaunchpadCommand {
  workspaceId: string;
  slug: string;
  name: string;
  description?: string;
}

@Injectable()
export class CreateLaunchpad implements Usecase<ICreateLaunchpadCommand> {
  constructor(private readonly launchpadRepository: LaunchpadRepository) {}

  async execute(command: ICreateLaunchpadCommand) {
    try {
      const launchpad = await this.launchpadRepository.create({
        workspaceId: command.workspaceId,
        slug: command.slug,
        name: command.name,
        description: command.description,
      });

      if (!launchpad) {
        throw new BadRequestException(
          'Bio page already exists in this workspace'
        );
      }

      return launchpad;
    } catch (err) {
      if (isDuplicatedError('slug', err)) {
        throw new BadRequestException('Bio page slug is already taken');
      }

      throw err;
    }
  }
}
