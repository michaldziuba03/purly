import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountRepository,
  AccountSchema,
  Report,
  ReportRepository,
  ReportSchema,
  ResetToken,
  ResetTokenRepository,
  ResetTokenSchema,
} from '@libs/data';
import { BullModule } from '@nestjs/bull';
import { MAIL_QUEUE } from '@libs/jobs';
import { QueueService } from './queue.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({ name: MAIL_QUEUE }),
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: ResetToken.name, schema: ResetTokenSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  providers: [
    AccountRepository,
    ResetTokenRepository,
    ReportRepository,
    QueueService,
  ],
  exports: [
    AccountRepository,
    ResetTokenRepository,
    ReportRepository,
    QueueService,
  ],
})
export class SharedModule {}
