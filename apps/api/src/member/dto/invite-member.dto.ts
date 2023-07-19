import { MemberRole } from '@purly/database';
import { IsEmail, IsEnum } from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  email?: string;

  @IsEnum(MemberRole)
  role: MemberRole;
}
