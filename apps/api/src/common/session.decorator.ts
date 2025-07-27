import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: FastifyRequest = ctx.switchToHttp().getRequest();
    const raw = req['raw'];
    if ('session' in raw) {
      return raw.session;
    }

    return {};
  },
);
