import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { Member } from '@purly/database';
import { CreateWorkspace } from './usecases/create-workspace.usecase';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserSession } from '../shared/user.decorator';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspaces } from './usecases/get-workspaces.usecase';
import { UpdateWorkspace } from './usecases/update-workspace.usecase';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AllowedRole } from './framework/allowed-role.decorator';
import { MembershipGuard } from './framework/membership.guard';
import { SkipMembershipCheck } from './framework/skip-membership.decorator';
import { Membership } from './framework/membership.decorator';
import { LeaveWorkspace } from './usecases/leave-workspace.usecase';

@Controller('workspaces')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceUsecase: CreateWorkspace,
    private readonly updateWorkspaceUsecase: UpdateWorkspace,
    private readonly getWorkspacesUsecase: GetWorkspaces,
    private readonly leaveWorkspaceUsecase: LeaveWorkspace
  ) {}

  @Get()
  @SkipMembershipCheck()
  getWorkspaces(@UserSession('id') userId: string) {
    return this.getWorkspacesUsecase.execute({
      userId,
    });
  }

  @Post()
  @SkipMembershipCheck()
  createWorkspace(
    @UserSession('id') userId: string,
    @Body() body: CreateWorkspaceDto
  ) {
    return this.createWorkspaceUsecase.execute({
      userId,
      name: body.name,
    });
  }

  @Patch(':workspaceId')
  @AllowedRole(MemberRole.ADMIN)
  updateWorkspace(
    @Membership() member: Member,
    @Body() body: UpdateWorkspaceDto
  ) {
    return this.updateWorkspaceUsecase.execute({
      name: body.name,
      userId: member.userId,
      workspaceId: member.workspaceId,
    });
  }

  @Delete(':workspaceId/leave')
  async leaveWorkspace(@Membership() member: Member) {
    const isRemoved = await this.leaveWorkspaceUsecase.execute({
      userId: member.userId,
      workspaceId: member.workspaceId,
      userRole: member.role,
    });

    return { success: isRemoved };
  }
}
