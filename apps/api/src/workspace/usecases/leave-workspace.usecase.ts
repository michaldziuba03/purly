import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { MemberRole, WorkspaceRepository } from '@purly/database';

interface ILeaveWorkspaceCommand {
  workspaceId: string;
  userId: string;
  userRole: MemberRole;
}

@Injectable()
export class LeaveWorkspace implements Usecase<ILeaveWorkspaceCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: ILeaveWorkspaceCommand) {
    if (command.userRole === MemberRole.OWNER) {
      return this.leaveAsOwner();
    }

    const isRemoved = await this.workspaceRepository.removeMember(
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
