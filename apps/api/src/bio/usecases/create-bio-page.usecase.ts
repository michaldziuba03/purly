import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository, isDuplicatedError } from '@purly/database';

interface ICreateBioPageCommand {
  workspaceId: string;
  identifier: string;
  description: string;
}

@Injectable()
export class CreateBioPage implements Usecase<ICreateBioPageCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: ICreateBioPageCommand) {
    try {
      const page = await this.bioRepository.create({
        identifier: command.identifier,
        workspaceId: command.workspaceId,
        description: command.description,
      });

      if (!page) {
        throw new BadRequestException(
          'You may have only one bio page for workspace'
        );
      }

      return page;
    } catch (err) {
      if (isDuplicatedError('identifier', err)) {
        throw new BadRequestException('Identifier is already taken');
      }

      throw err;
    }
  }
}
