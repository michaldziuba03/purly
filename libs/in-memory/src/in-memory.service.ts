import { InjectRedis } from '@mich4l/nestjs-redis';
import type { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  get instances() {
    return [this.redis];
  }

  get instance() {
    return this.redis;
  }
}
