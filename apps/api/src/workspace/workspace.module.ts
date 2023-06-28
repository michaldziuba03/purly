import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { GetMembers } from './usecases/members/get-members.usecase';
import { DeleteWorkspace } from './usecases/delete-workspace.usecase';
import { GetWorkspaces } from './usecases/get-workspaces.usecase';
import { ChangePermission } from './usecases/members/change-permission.usecase';
import { RemoveMember } from './usecases/members/remove-member.usecase';
import { LeaveWorkspace } from './usecases/members/leave-workspace.usecase';
import { BanMember } from './usecases/members/ban-member.usecase';

@Module({
  controllers: [WorkspaceController],
  providers: [
    CreateWorkspace,
    UpdateWorkspace,
    DeleteWorkspace,
    GetWorkspaces,
    // Membership management providers:
    GetMembers,
    ChangePermission,
    BanMember,
    RemoveMember,
    LeaveWorkspace,
  ],
})
export class WorkspaceModule {}
