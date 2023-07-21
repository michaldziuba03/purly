import { SetMetadata } from '@nestjs/common';
import { MemberRole } from '@purly/shared';

export const MEMBER_ROLE = Symbol('MEMBER_ROLE');

// MINIMAL ROLE to access endpoint
export const AllowedRole = (role: MemberRole) => SetMetadata(MEMBER_ROLE, role);
