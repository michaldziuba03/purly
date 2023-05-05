import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

const OPTIONAL_AUTH = 'OPTIONAL_AUTH';
export const OptionalAuth = () => SetMetadata(OPTIONAL_AUTH, true);

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isOptional = this.reflector.get<boolean>(
      OPTIONAL_AUTH,
      context.getHandler(),
    );
    if (isOptional) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated();
  }
}
