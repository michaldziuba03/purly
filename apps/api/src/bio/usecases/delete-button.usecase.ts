import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/postgres';

interface IDeleteButtonCommand {
  userId: string;
  blockId: string;
}

@Injectable()
export class DeleteButton implements Usecase<IDeleteButtonCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IDeleteButtonCommand) {
    const bioId = await this.bioRepository.getBioIdByUser(command.userId);
    if (!bioId) {
      throw new NotFoundException('Bio page not found');
    }

    const isDeleted = await this.bioRepository.deleteButton(
      command.blockId,
      bioId
    );
    if (!isDeleted) {
      throw new NotFoundException('Button not found');
    }

    return { success: isDeleted };
  }
}
