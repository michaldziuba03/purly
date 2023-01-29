import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@mich4l/nestjs-redis';
import { Config } from './config/config';
import { SubscriptionModule } from './subscription/subscription.module';
import { StripeModule } from './stripe/stripe.module';
import { PlanModule } from './plan/plan.module';
import { StripeEventModule } from './stripe-event/stripe-event.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({ useExisting: Config }),
    DatabaseModule,
    AccountModule,
    AuthModule,
    StripeModule,
    StripeEventModule,
    PlanModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
