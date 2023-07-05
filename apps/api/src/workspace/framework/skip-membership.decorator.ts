import { SetMetadata } from '@nestjs/common';

export const SKIP_MEMBERSHIP = Symbol('SKIP_MEMBERSHIP');

export const SkipMembershipCheck = () => SetMetadata(SKIP_MEMBERSHIP, true);
