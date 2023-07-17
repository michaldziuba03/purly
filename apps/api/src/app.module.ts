import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '@purly/database';
import { LoggerModule } from '@purly/logger';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@mich4l/nestjs-redis';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    DatabaseModule,
    RedisModule.forRoot({ connectUrl: process.env['REDIS_URI'] }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
