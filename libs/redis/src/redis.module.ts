import { Global, Module } from '@nestjs/common';
import { RedisModule as RedisBaseModule } from '@mich4l/nestjs-redis';

@Global()
@Module({
  imports: [
    RedisBaseModule.forRoot({
      connectUrl: process.env['REDIS_URI'],
    }),
  ],
})
export class RedisModule {}
