import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { Redis } from 'ioredis';
import { MailsProducer } from './mails/mails.producer';
import { MAILS_QUEUE } from './mails/mails.jobs';
import { ClicksProducer } from './clicks/clicks.producer';
import { CLICKS_QUEUE } from './clicks/clicks.jobs';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: new Redis(process.env['REDIS_URI'] as string, {
        maxRetriesPerRequest: null,
      }),
    }),
    BullModule.registerQueue({
      name: MAILS_QUEUE,
    }),
    BullModule.registerQueue({
      name: CLICKS_QUEUE,
    }),
  ],
  providers: [MailsProducer, ClicksProducer],
  exports: [MailsProducer, ClicksProducer],
})
export class QueueModule {}
