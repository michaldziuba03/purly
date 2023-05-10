import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountRepository,
  AccountSchema,
  Link,
  LinkRepository,
  LinkSchema,
  Report,
  ReportRepository,
  ReportSchema,
  ResetToken,
  ResetTokenRepository,
  ResetTokenSchema,
  Transaction,
  TransactionManager,
  TransactionRepository,
  TransactionSchema,
} from '@libs/data';
import { BullModule } from '@nestjs/bullmq';
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
      { name: Link.name, schema: LinkSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [
    TransactionManager,
    AccountRepository,
    ResetTokenRepository,
    ReportRepository,
    LinkRepository,
    QueueService,
    TransactionRepository,
  ],
  exports: [
    TransactionManager,
    AccountRepository,
    ResetTokenRepository,
    ReportRepository,
    LinkRepository,
    QueueService,
    TransactionRepository,
  ],
})
export class SharedModule {}
