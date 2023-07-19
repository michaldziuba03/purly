import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { Member } from '@purly/database';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { Membership } from '../workspace/framework/membership.decorator';
import { GetMembers } from './usecases/get-members.usecase';
import { RemoveMember } from './usecases/remove-member.usecase';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ChangeRole } from './usecases/change-role.usecase';

@Controller('workspaces/:workspaceId/members')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MemberController {
  constructor(
    private readonly getMembersUsecase: GetMembers,
    private readonly changeRoleUsecase: ChangeRole,
    private readonly removeMemberUsecase: RemoveMember
  ) {}

  @Get()
  getMembers(@Membership() member: Member) {
    return this.getMembersUsecase.execute({
      workspaceId: member.workspaceId,
    });
  }

  @Patch(':memberId/roles')
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
