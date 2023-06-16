import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  private readonly VERIFY_URL =
    'https://www.google.com/recaptcha/api/siteverify';

  private get isEnabled() {
    return process.env.ENABLE_RECAPTCHA === 'true';
  }

  async canActivate(ctx: ExecutionContext) {
    if (!this.isEnabled) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest<Request>();
    const recaptchaToken = req.body.recaptcha;

    if (!recaptchaToken) {
      throw new BadRequestException('Recaptcha token is required');
    }

    if (typeof recaptchaToken !== 'string') {
      throw new BadRequestException('Recaptcha token must be a string');
    }

    if (recaptchaToken.length < 1) {
      throw new BadRequestException('Recaptcha token cannot be empty');
    }

    const result = await this.sendRecaptcha(recaptchaToken, req.ip);
    if (result.success) {
      return true;
    }

    const errorCodes = result['error-codes'];
    if (errorCodes.length) {
      this.checkErrors(errorCodes);
    }

    return false;
  }

  async sendRecaptcha(recaptchaToken: string, ip?: string) {
    const params = {
      secret: process.env.RECAPTCHA_SECRET,
      remoteip: ip,
      response: recaptchaToken,
    };

    const result = await axios.post<IRecaptchaResponse>(
      this.VERIFY_URL,
      {},
      {
        params,
      }
    );

    return result.data;
  }

  private checkErrors(errorCodes: RecaptchaError[]) {
    switch (errorCodes[0]) {
      case 'missing-input-secret':
        throw new Error('Missing Recaptcha secret parameter');
      case 'invalid-input-secret':
        throw new Error('Invalid Recaptcha secret parameter');
      default:
        throw new BadRequestException('Invalid Recaptcha token');
    }
  }
}

type RecaptchaError =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate';

interface IRecaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes': RecaptchaError[];
}
