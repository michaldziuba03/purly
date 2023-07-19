import { Module } from '@nestjs/common';
import { GetMembers } from './usecases/get-members.usecase';
import { RemoveMember } from './usecases/remove-member.usecase';
import { MemberController } from './member.controller';
import { ChangeRole } from './usecases/change-role.usecase';

@Module({
  controllers: [MemberController],
  providers: [GetMembers, ChangeRole, RemoveMember],
})
export class MemberModule {}
