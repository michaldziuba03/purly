import { Injectable } from '@nestjs/common';
import { ColorsDto } from '../dto/colors.dto';
import { Usecase } from '../../shared/base.usecase';
import { LaunchpadRepository } from '@purly/database';

interface IUpdateLaunchpadCommand extends ColorsDto {
  workspaceId: string;
  title: string;
  description?: string;
}

@Injectable()
export class UpdateLaunchpad implements Usecase<IUpdateLaunchpadCommand> {
  constructor(private readonly launchpadRepository: LaunchpadRepository) {}

  execute(command: IUpdateLaunchpadCommand) {
    return this.launchpadRepository.updateByWorkspace(command.workspaceId, {
      title: command.title,
      description: command.description,
      bgColor: command.bgColor,
      textColor: command.textColor,
      btnColor: command.btnColor,
      btnTextColor: command.btnTextColor,
    });
  }
}
