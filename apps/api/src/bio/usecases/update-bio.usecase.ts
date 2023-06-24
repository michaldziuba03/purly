import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';

interface IUpdateBioCommand {
  title?: string;
  description?: string;
  userId: string;
}

@Injectable()
export class UpdateBio implements Usecase<IUpdateBioCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IUpdateBioCommand): Promise<boolean> {
    const result = await this.bioRepository.updateByUser(command.userId, {
      title: command.title,
      description: command.description,
    });

    return result.affected > 0;
  }
}
