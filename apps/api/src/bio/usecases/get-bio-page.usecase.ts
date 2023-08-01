import { Injectable, NotFoundException } from '@nestjs/common';
import { BioRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';

interface IGetBioPageCommand {
  workspaceId: string;
}

@Injectable()
export class GetBioPage implements Usecase<IGetBioPageCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IGetBioPageCommand) {
    const page = await this.bioRepository.findByWorkspace(command.workspaceId);
    if (!page) {
      throw new NotFoundException('Bio page not found');
    }

    return page;
  }
}
