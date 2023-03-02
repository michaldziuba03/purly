import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { OPTIONAL_AUTH } from '../../common/decorators/optional-auth.decorator';

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

@Injectable()
export class GuestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.isAuthenticated()) {
      throw new ForbiddenException('You are currently logged-in');
    }

    return true;
  }
}
