import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClicksModule } from './clicks/clicks.module';
import { ClickHouseModule } from '@md03/nestjs-clickhouse';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClickHouseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          host: config.get('CLICKHOUSE_HOST'),
          username: config.get('CLICKHOUSE_USER'),
          password: config.get('CLICKHOUSE_PASS'),
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
        },
      }),
    }),
    MailModule,
    ClicksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
