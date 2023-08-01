import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository, isDuplicatedError } from '@purly/database';

interface IUpdateBioPageCommand {
  workspaceId: string;
  identifier?: string;
  name?: string;
  description?: string;
}

@Injectable()
export class UpdateBioPage implements Usecase<IUpdateBioPageCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IUpdateBioPageCommand) {
    try {
      const page = await this.bioRepository.updateByWorkspace(
        command.workspaceId,
        {
          identifier: command.identifier,
          name: command.name,
          description: command.description,
        }
      );

      return page;
    } catch (err) {
      if (isDuplicatedError('identifier', err)) {
        throw new BadRequestException('Identifier is already taken');
      }

      throw err;
    }
  }
}
