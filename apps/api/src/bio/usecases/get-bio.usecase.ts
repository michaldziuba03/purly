import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';

interface IGetBioPageCommand {
  name: string;
}

@Injectable()
export class GetBioPage implements Usecase<IGetBioPageCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  execute(command: IGetBioPageCommand) {
    return this.bioRepository.getPageByName(command.name);
  }
}
