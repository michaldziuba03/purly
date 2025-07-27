import { Injectable } from '@nestjs/common';
import { SessionManager } from '@purly/security';
import { FastifyRequest, FastifyReply } from 'fastify';
import { fastifyCookie } from '@fastify/cookie';

@Injectable()
export class SessionMiddleware {
  constructor(private readonly sessionManager: SessionManager) {}

  async use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: () => void,
  ) {
    if ('session' in req) {
      next();
      return;
    }

    if (!req.headers.cookie) {
      req['session'] = {};
      next();
      return;
    }

    const cookies = fastifyCookie.parse(req.headers.cookie);
    const sessionToken = cookies.session;
    if (!sessionToken) {
      req['session'] = {};
      next();
      return;
    }

    const session = await this.sessionManager.getSession(sessionToken);
    if (!session) {
      req['session'] = {};
      next();
      return;
    }

    req['session'] = session;
    console.log('Session:', req['session']);
    next();
  }
}
