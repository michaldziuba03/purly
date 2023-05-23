import { Injectable } from '@nestjs/common';
import {
  MAIL_QUEUE,
  MailJobs,
  ResetPasswordPayload,
  VerificationPayload,
  ReportPayload,
  RecordClickPayload,
  CLICK_QUEUE,
} from '@libs/jobs';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailQueue: Queue,
    @InjectQueue(CLICK_QUEUE)
    private readonly clicksQueue: Queue,
  ) {}

  sendResetEmail(payload: ResetPasswordPayload) {
    return this.mailQueue.add(MailJobs.Reset, payload, { attempts: 2 });
  }

  sendVerificationEmail(payload: VerificationPayload) {
    return this.mailQueue.add(MailJobs.Verification, payload, { attempts: 2 });
  }

  sendReportEmail(payload: ReportPayload) {
    return this.mailQueue.add(MailJobs.Report, payload, { attempts: 2 });
  }

  recordClick(payload: RecordClickPayload) {
    return this.clicksQueue.add('click', payload);
  }
}
