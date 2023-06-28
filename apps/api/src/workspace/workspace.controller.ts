import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UserSession } from '../shared/user.decorator';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { GetMembers } from './usecases/members/get-members.usecase';
import { DeleteWorkspace } from './usecases/delete-workspace.usecase';
import { GetWorkspaces } from './usecases/get-workspaces.usecase';

@Controller('workspaces')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceUsecase: CreateWorkspace,
    private readonly updateWorkspaceUsecase: UpdateWorkspace,
    private readonly deleteWorkspaceUsecase: DeleteWorkspace,
    private readonly getWorkspacesUsecase: GetWorkspaces,
    private readonly getMembersUsecase: GetMembers
  ) {}

  @Post()
  createWorkspace(
    @UserSession('id') userId: string,
    @Body() body: CreateWorkspaceDto
  ) {
    return this.createWorkspaceUsecase.execute({
      userId,
      name: body.name,
      description: body.description,
    });
  }

  @Get()
  getWorkspaces(@UserSession('id') userId: string) {
    return this.getWorkspacesUsecase.execute({ userId });
  }

  @Get(':workspaceId/members')
  getWorkspaceMembers(@Param('workspaceId') workspaceId: string) {
    return this.getMembersUsecase.execute({ workspaceId });
  }

  @Post(':workspaceId')
  async updateWorkspace(
    @UserSession('id') userId: string,
    @Param('workspaceId') workspaceId: string,
    @Body() body: UpdateWorkspaceDto
  ) {
    const isUpdated = await this.updateWorkspaceUsecase.execute({
      userId,
      workspaceId,
      name: body.name,
      description: body.description,
    });

    return { success: isUpdated };
  }

  @Delete(':workspaceId')
  async deleteWorkspace(
    @UserSession('id') userId: string,
    @Param('workspaceId') workspaceId: string
  ) {
    const isDeleted = await this.deleteWorkspaceUsecase.execute({
      userId,
      workspaceId,
    });

    return { success: isDeleted };
  }
}
