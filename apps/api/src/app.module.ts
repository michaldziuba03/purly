import { Module } from '@nestjs/common';
import { RedisModule } from '@mich4l/nestjs-redis';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { BullModule } from '@nestjs/bullmq';
import { LinkModule } from './link/link.module';
import { ReportModule } from './report/report.module';
import { StripeModule } from './stripe/stripe.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BillingModule } from './billing/billing.module';
import Redis from 'ioredis';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot(),
    RedisModule.forRootAsync({ useExisting: Config }),
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => {
        return { uri: config.mongoURI };
      },
    }),
    BullModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => ({
        connection: new Redis(config.createRedisOptions().connectUrl),
      }),
    }),
    SharedModule,
    AccountModule,
    AuthModule,
    HealthModule,
    LinkModule,
    ReportModule,
    StripeModule,
    BillingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
