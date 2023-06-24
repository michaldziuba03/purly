import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';

interface IDeleteBioCommand {
  userId: string;
}

@Injectable()
export class DeleteBio implements Usecase<IDeleteBioCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IDeleteBioCommand): Promise<boolean> {
    const result = await this.bioRepository.deleteBio(command.userId);

    return result.affected > 0;
  }
}
