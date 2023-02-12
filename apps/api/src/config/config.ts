import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IORedisOptions, RedisOptionsFactory } from '@mich4l/nestjs-redis';
import { NodeEnv } from './config.types';
import { config } from 'rxjs';

@Injectable()
export class Config implements RedisOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV');
  }

  get isDev() {
    return this.nodeEnv === NodeEnv.DEV;
  }

  get port() {
    return this.configService.get<number>('PORT');
  }

  get apiPrefix() {
    return this.configService.get<string | undefined>('API_PREFIX');
  }

  get sessionSecret() {
    return this.configService.get<string>('SESSION_SECRET');
  }

  get mongoURI() {
    return this.configService.get<string>('MONGO_URI');
  }

  createRedisOptions(): IORedisOptions {
    return {
      connectUrl: this.configService.get<string>('REDIS_URI'),
    };
  }

  get stripeSecret() {
    return this.configService.get<string>('STRIPE_SECRET_KEY');
  }

  get stripeWebhookSecret() {
    return this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
  }

  get googleClientId() {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }

  get githubClientId() {
    return this.configService.get<string>('GITHUB_CLIENT_ID');
  }

  get githubClientSecret() {
    return this.configService.get<string>('GITHUB_CLIENT_SECRET');
  }
}
