import { MemberRole } from '@purly/database';
import { IsEnum } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(MemberRole)
  role: MemberRole;
}
