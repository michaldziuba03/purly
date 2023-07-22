import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@mich4l/nestjs-redis';
import { LockService } from './lock/lock.service';
import { InMemoryService } from './in-memory.service';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      connectUrl: process.env['REDIS_URI'],
    }),
  ],
  providers: [InMemoryService, LockService],
  exports: [InMemoryService, LockService],
})
export class InMemoryModule {}
