import { BioRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IGetMyBioCommand {
  userId: string;
}

@Injectable()
export class GetMyBioPage implements Usecase<IGetMyBioCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  execute(command: IGetMyBioCommand) {
    return this.bioRepository.getPageByUser(command.userId);
  }
}
