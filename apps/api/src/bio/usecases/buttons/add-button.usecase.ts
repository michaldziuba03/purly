import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';
import { CreateLink } from '../../../link/usecases/create-link.usecase';

interface IAddButtonCommand {
  label: string;
  userId: string;
  url: string;
}

@Injectable()
export class AddButton implements Usecase<IAddButtonCommand> {
  constructor(
    private readonly bioRepository: BioRepository,
    private readonly createLinkUsecase: CreateLink
  ) {}

  async execute(command: IAddButtonCommand) {
    const bioId = await this.bioRepository.getBioIdByUser(command.userId);
    if (!bioId) {
      throw new NotFoundException('Bio page not found');
    }

    const link = await this.createLinkUsecase.execute({
      userId: command.userId,
      url: command.url,
      name: command.label,
      isButton: true,
    });

    const btn = await this.bioRepository.addButton({
      bioId: bioId,
      label: command.label,
      url: command.url,
      linkRef: link.alias,
    });

    return btn;
  }
}
