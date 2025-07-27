import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionManager } from '@purly/security';
import type { FastifyRequest } from 'fastify';

const OPTIONAL_AUTH = Symbol('OPTIONAL_AUTH');
export const OptionalAuth = () => SetMetadata(OPTIONAL_AUTH, true);

export const SESSION_COOKIE_NAME = 'session';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionManager: SessionManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOptional = this.reflector.get<boolean>(
      OPTIONAL_AUTH,
      context.getHandler(),
    );
    if (isOptional) {
      return true;
    }

    const req: FastifyRequest = context.switchToHttp().getRequest();
    const sessionToken = req.cookies[SESSION_COOKIE_NAME];
    if (!sessionToken) {
      return false;
    }

    const session = await this.sessionManager.getSession(sessionToken);
    if (!session) {
      return false;
    }

    req['session'] = session;
    return true;
  }
}
