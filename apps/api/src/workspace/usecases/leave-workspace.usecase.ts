import { Injectable } from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository, WorkspaceRepository } from '@purly/database';

interface ILeaveWorkspaceCommand {
  workspaceId: string;
  userId: string;
  userRole: MemberRole;
}

@Injectable()
export class LeaveWorkspace implements Usecase<ILeaveWorkspaceCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: ILeaveWorkspaceCommand) {
    if (command.userRole === MemberRole.OWNER) {
      return this.leaveAsOwner();
    }

    const isRemoved = await this.memberRepository.removeMember(
      command.workspaceId,
      command.userId
    );

    return isRemoved;
  }

  async leaveAsOwner() {
    // TODO: implement logic for leaving as owner
    return false;
  }
}
