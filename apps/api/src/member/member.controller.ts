import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { Member, MemberRole } from '@purly/database';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { Membership } from '../workspace/framework/membership.decorator';
import { GetMembers } from './usecases/get-members.usecase';
import { RemoveMember } from './usecases/remove-member.usecase';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ChangeRole } from './usecases/change-role.usecase';
import { InviteMember } from './usecases/invite-member.usecase';
import { InviteMemberDto } from './dto/invite-member.dto';
import { AllowedRole } from '../workspace/framework/allowed-role.decorator';
import { GetInvites } from './usecases/get-invites.usecase';
import { DeleteInvite } from './usecases/delete-invite.usecase';
import { DeleteInviteDto } from './dto/delete-invite.dto';

@Controller('members/:workspaceId')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MemberController {
  constructor(
    private readonly inviteMemberUsecase: InviteMember,
    private readonly getInvitesUsecase: GetInvites,
    private readonly deleteInviteUsecase: DeleteInvite,
    private readonly getMembersUsecase: GetMembers,
    private readonly changeRoleUsecase: ChangeRole,
    private readonly removeMemberUsecase: RemoveMember
  ) {}

  @Post('invites')
  @AllowedRole(MemberRole.ADMIN)
  inviteMember(@Body() body: InviteMemberDto, @Membership() member: Member) {
    return this.inviteMemberUsecase.execute({
      workspaceId: member.workspaceId,
      userId: member.userId,
      email: body.email,
      role: body.role,
      expiresAt: body.expiresAt,
    });
  }

  @Get('invites')
  getInvites(@Membership() member: Member) {
    return this.getInvitesUsecase.execute({
      workspaceId: member.workspaceId,
    });
  }

  @Post('invites/delete')
  @AllowedRole(MemberRole.ADMIN)
  async deleteInvite(
    @Body() body: DeleteInviteDto,
    @Membership() member: Member
  ) {
    const isDeleted = await this.deleteInviteUsecase.execute({
      email: body.email,
      workspaceId: member.workspaceId,
    });

    return { success: isDeleted };
  }

  @Get()
  getMembers(@Membership() member: Member) {
    return this.getMembersUsecase.execute({
      workspaceId: member.workspaceId,
    });
  }

  @Patch(':memberId/roles')
  @AllowedRole(MemberRole.ADMIN)
  async changeMemberRole(
    @Body() body: ChangeRoleDto,
    @Param('memberId') memberId: string,
    @Membership() member: Member
  ) {
    const isChanged = await this.changeRoleUsecase.execute({
      memberId,
      userId: member.userId,
      workspaceId: member.workspaceId,
      newRole: body.role,
      userRole: member.role,
    });

    return { success: isChanged };
  }

  @Delete(':memberId')
  @AllowedRole(MemberRole.ADMIN)
  async removeMember(
    @Membership() member: Member,
    @Param('memberId') memberId: string
  ) {
    const isRemoved = await this.removeMemberUsecase.execute({
      memberId,
      userId: member.userId,
      workspaceId: member.workspaceId,
      userRole: member.role,
    });

    return { success: isRemoved };
  }
}
