import { Module } from '@nestjs/common';
import { GetMembers } from './usecases/get-members.usecase';
import { RemoveMember } from './usecases/remove-member.usecase';
import { MemberController } from './member.controller';
import { ChangeRole } from './usecases/change-role.usecase';
import { InviteMember } from './usecases/invite-member.usecase';
import { InviteController } from './invite.controller';
import { AcceptInvite } from './usecases/accept-invite.usecase';
import { GetInvites } from './usecases/get-invites.usecase';
import { DeleteInvite } from './usecases/delete-invite.usecase';

@Module({
  controllers: [MemberController, InviteController],
  providers: [
    GetMembers,
    ChangeRole,
    RemoveMember,
    InviteMember,
    AcceptInvite,
    GetInvites,
    DeleteInvite,
  ],
})
export class MemberModule {}
