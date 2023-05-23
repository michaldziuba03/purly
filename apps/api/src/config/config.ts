import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IORedisOptions, RedisOptionsFactory } from '@mich4l/nestjs-redis';
import { NodeEnv } from './config.types';
import {
  ClickHouseOptions,
  ClickHouseOptionsFactory,
} from '@md03/nestjs-clickhouse';

@Injectable()
export class Config implements RedisOptionsFactory, ClickHouseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV');
  }

  get isDev() {
    return this.nodeEnv === NodeEnv.DEV;
  }

  get emailReport() {
    return this.configService.get<string>('REPORT_MAIL');
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

  get aliasSalt() {
    return this.configService.get<string>('ALIAS_SALT');
  }

  get mongoURI() {
    return this.configService.get<string>('MONGO_URI');
  }

  get zookeeperURI() {
    return this.configService.get<string>('ZOOKEEPER_URI');
  }

  createRedisOptions(): IORedisOptions {
    return {
      connectUrl: this.configService.get<string>('REDIS_URI'),
    };
  }

  createClickHouseOptions(): ClickHouseOptions {
    return {
      host: this.configService.get<string>('CLICKHOUSE_HOST'),
      username: this.configService.get<string>('CLICKHOUSE_USER'),
      password: this.configService.get<string>('CLICKHOUSE_PASS'),
    };
  }

  get stripeSecret() {
    return this.configService.get<string>('STRIPE_SECRET');
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

  get enableRecaptcha() {
    return this.configService.get<boolean>('ENABLE_RECAPTCHA');
  }

  get recaptchaSecret() {
    return this.configService.get<string>('RECAPTCHA_SECRET');
  }
}
