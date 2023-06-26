import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/postgres';

interface IRemoveMemberCommand {
  userId: string;
  memberId: string;
  workspaceId: string;
}

@Injectable()
export class RemoveMember implements Usecase<IRemoveMemberCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: IRemoveMemberCommand) {
    if (command.memberId === command.userId) {
      throw new BadRequestException('You cannot remove yourself');
    }

    await this.memberRepository.removeMember(
      command.workspaceId,
      command.memberId
    );
  }
}
