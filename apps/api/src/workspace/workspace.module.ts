import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { GetMembers } from './usecases/get-members.usecase';

@Module({
  controllers: [WorkspaceController],
  providers: [CreateWorkspace, UpdateWorkspace, GetMembers],
})
export class WorkspaceModule {}
