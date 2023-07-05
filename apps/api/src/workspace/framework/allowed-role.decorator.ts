import { SetMetadata } from '@nestjs/common';
import { Permissions } from '@purly/postgres';

export const MEMBER_ROLE = Symbol('MEMBER_ROLE');

// MINIMAL ROLE to access endpoint
export const AllowedRole = (role: Permissions) =>
  SetMetadata(MEMBER_ROLE, role);
