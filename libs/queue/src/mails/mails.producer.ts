import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';
import {
  IReportEmail,
  IResetPasswordEmail,
  IVerificationEmail,
  MAILS_QUEUE,
  MailJobs,
} from './mails.jobs';

@Injectable()
export class MailsProducer {
  constructor(
    @InjectQueue(MAILS_QUEUE)
    private readonly mailsQueue: Queue
  ) {}

  sendResetPasswordLink(data: IResetPasswordEmail) {
    return this.mailsQueue.add(MailJobs.RESET_PASSWORD, data);
  }

  sendReport(data: IReportEmail) {
    return this.mailsQueue.add(MailJobs.REPORT, data);
  }

  sendVerificationLink(data: IVerificationEmail) {
    return this.mailsQueue.add(MailJobs.VERIFICATION, data);
  }
}
