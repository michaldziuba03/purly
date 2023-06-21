import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';

interface ICreateBioCommand {
  name: string;
  userId: string;
}

@Injectable()
export class CreateBio implements Usecase<ICreateBioCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: ICreateBioCommand) {
    const pageExists = await this.bioRepository.exists(command.name);
    if (pageExists) {
      throw new BadRequestException('Bio page with this name already exists');
    }

    return this.bioRepository.create(command.name, command.userId);
  }
}
