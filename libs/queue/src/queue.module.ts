import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { Redis } from 'ioredis';
import { MailsProducer } from './mails/mails.producer';
import { MAILS_QUEUE } from './mails/mails.jobs';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: new Redis(process.env['REDIS_URI'] as string),
    }),
    BullModule.registerQueue({
      name: MAILS_QUEUE,
    }),
  ],
  providers: [MailsProducer],
  exports: [MailsProducer],
})
export class QueueModule {}
