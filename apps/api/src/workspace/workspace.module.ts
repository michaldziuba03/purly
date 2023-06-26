import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { GetMembers } from './usecases/get-members.usecase';
import { DeleteWorkspace } from './usecases/delete-workspace.usecase';
import { GetWorkspaces } from './usecases/get-workspaces.usecase';

@Module({
  controllers: [WorkspaceController],
  providers: [
    CreateWorkspace,
    UpdateWorkspace,
    DeleteWorkspace,
    GetWorkspaces,
    GetMembers,
  ],
})
export class WorkspaceModule {}
