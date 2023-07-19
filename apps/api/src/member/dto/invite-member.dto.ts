import { MemberRole } from '@purly/database';
import { IsDate, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ToDate } from '../../shared/date.transformer';

export class InviteMemberDto {
  @IsEmail()
  email?: string;

  @IsEnum(MemberRole)
  role: MemberRole = MemberRole.MEMBER;

  @ToDate()
  @IsDate()
  @IsOptional()
  expiresAt?: Date;
}
