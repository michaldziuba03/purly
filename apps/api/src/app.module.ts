import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@mich4l/nestjs-redis';
import { Config } from './config/config';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({ useExisting: Config }),
    DatabaseModule,
    AccountModule,
    AuthModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
