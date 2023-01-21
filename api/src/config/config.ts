import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IORedisOptions, RedisOptionsFactory } from '@mich4l/nestjs-redis';
import { NodeEnv } from './config.types';

@Injectable()
export class Config implements RedisOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV');
  }

  get isDev() {
    return this.nodeEnv === NodeEnv.DEV;
  }

  get isTest() {
    return this.nodeEnv === NodeEnv.TEST;
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
    if (this.isTest) {
      return this.configService.get<string>('MONGO_TEST_URI');
    }
    return this.configService.get<string>('MONGO_URI');
  }

  createRedisOptions(): IORedisOptions {
    return {
      connectUrl: this.configService.get<string>('REDIS_URI'),
    };
  }
}
