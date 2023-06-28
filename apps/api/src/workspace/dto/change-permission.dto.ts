import { Permissions } from '@purly/postgres';
import { IsEnum } from 'class-validator';

export class ChangePermissionDto {
  @IsEnum(Permissions)
  permission: Permissions;
}
