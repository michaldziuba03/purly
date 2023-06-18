import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { captureException, User } from '@sentry/node';
import type { Request } from 'express';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  private ignoreError(exception: unknown): boolean {
    // don't report to sentry regular http errors:
    return exception instanceof HttpException && exception.getStatus() < 500;
  }

  catch(exception: any, host: ArgumentsHost): void {
    if (!this.ignoreError(exception)) {
      captureException(exception, {
        user: this.getUser(host),
      });
    }

    super.catch(exception, host);
  }

  private getUser(host: ArgumentsHost): User {
    if (host.getType() !== 'http') {
      return;
    }

    const req = host.switchToHttp().getRequest<Request>();
    const user = req.user as { id: string };

    return {
      id: user?.id,
      ip_address: req.ip,
    };
  }
}
