import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { GetWorkspaces } from './usecases/get-workspaces.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { LeaveWorkspace } from './usecases/leave-workspace.usecase';

@Module({
  controllers: [WorkspaceController],
  providers: [CreateWorkspace, UpdateWorkspace, LeaveWorkspace, GetWorkspaces],
})
export class WorkspaceModule {}
