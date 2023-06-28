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
import { MembershipGuard } from './framework/membership.guard';
import { ChangePermission } from './usecases/members/change-permission.usecase';
import { RemoveMember } from './usecases/members/remove-member.usecase';
import { Membership } from './framework/membership.decorator';
import { Member } from '@purly/postgres';
import { ChangePermissionDto } from './dto/change-permission.dto';
import { BanMember } from './usecases/members/ban-member.usecase';

@Controller('workspaces')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceUsecase: CreateWorkspace,
    private readonly updateWorkspaceUsecase: UpdateWorkspace,
    private readonly deleteWorkspaceUsecase: DeleteWorkspace,
    private readonly getWorkspacesUsecase: GetWorkspaces,
    private readonly getMembersUsecase: GetMembers,
    private readonly changePermissionUsecase: ChangePermission,
    private readonly banMemberUsecase: BanMember,
    private readonly removeMemberUsecase: RemoveMember
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

  @Post(':workspaceId')
  @UseGuards(MembershipGuard)
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
  @UseGuards(MembershipGuard)
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

  @Get(':workspaceId/members')
  @UseGuards(MembershipGuard)
  getWorkspaceMembers(@Param('workspaceId') workspaceId: string) {
    return this.getMembersUsecase.execute({ workspaceId });
  }

  @Post(':workspaceId/members/:memberId/roles')
  @UseGuards(MembershipGuard)
  async changePermission(
    @Param('workspaceId') workspaceId: string,
    @Param('memberId') memberId: string,
    @Membership() membership: Member,
    @Body() body: ChangePermissionDto
  ) {
    const isChanged = await this.changePermissionUsecase.execute({
      memberId,
      workspaceId,
      memberPermission: body.permission,
      userId: membership.userId,
      userPermission: membership.permission,
    });

    return { success: isChanged };
  }

  @Post(':workspaceId/members/:memberId/bans')
  @UseGuards(MembershipGuard)
  async banMember(
    @Param('workspaceId') workspaceId: string,
    @Param('memberId') memberId: string,
    @Membership() membership: Member
  ) {
    const isBanned = await this.banMemberUsecase.execute({
      userId: membership.userId,
      userPermission: membership.permission,
      memberId,
      workspaceId,
    });

    return { success: isBanned };
  }

  @Delete(':workspaceId/members/:memberId')
  @UseGuards(MembershipGuard)
  async removeMember(
    @Param('workspaceId') workspaceId: string,
    @Param('memberId') memberId: string,
    @Membership() membership: Member
  ) {
    const isRemoved = await this.removeMemberUsecase.execute({
      memberId,
      userId: membership.userId,
      userPermission: membership.permission,
      workspaceId,
    });

    return { success: isRemoved };
  }
}
