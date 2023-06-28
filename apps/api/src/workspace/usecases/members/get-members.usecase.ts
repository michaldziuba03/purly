import { Injectable } from '@nestjs/common';
import { MemberRepository } from '@purly/postgres';
import { Usecase } from '../../../shared/base.usecase';

interface IGetMembersCommand {
  workspaceId: string;
}

@Injectable()
export class GetMembers implements Usecase<IGetMembersCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  execute(command: IGetMembersCommand) {
    return this.memberRepository.findMembersByWorkspace(command.workspaceId);
  }
}
