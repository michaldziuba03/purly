import { MemberRole } from '@purly/shared';
import { IsEnum } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(MemberRole)
  role: MemberRole;
}
