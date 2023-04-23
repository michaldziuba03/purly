import { Module } from '@nestjs/common';
import { RedisModule } from '@mich4l/nestjs-redis';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule,
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
        url: config.createRedisOptions().connectUrl,
      }),
    }),
    SharedModule,
    AccountModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
