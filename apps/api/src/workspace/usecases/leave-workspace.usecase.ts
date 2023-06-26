import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/postgres';

interface ILeaveWorkspace {
  userId: string;
  workspaceId: string;
}

@Injectable()
export class LeaveWorkspace implements Usecase<ILeaveWorkspace> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: ILeaveWorkspace) {
    const isRemoved = await this.memberRepository.removeMember(
      command.workspaceId,
      command.userId
    );

    return isRemoved;
  }
}
