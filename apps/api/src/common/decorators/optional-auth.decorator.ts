import { SetMetadata } from '@nestjs/common';

export const OPTIONAL_AUTH = 'OPTIONAL_AUTH';
export const OptionalAuth = () => SetMetadata(OPTIONAL_AUTH, true);
