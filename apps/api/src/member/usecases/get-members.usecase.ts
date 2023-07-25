import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/database';

interface IGetMembersCommand {
  workspaceId: string;
}

@Injectable()
export class GetMembers implements Usecase<IGetMembersCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  execute(command: IGetMembersCommand) {
    return this.memberRepository.findMembers(command.workspaceId);
  }
}
