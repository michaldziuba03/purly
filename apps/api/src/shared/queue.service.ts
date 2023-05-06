import { Injectable } from '@nestjs/common';
import {
  MAIL_QUEUE,
  MailJobs,
  ResetPasswordPayload,
  VerificationPayload,
  ReportPayload,
} from '@libs/jobs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailQueue: Queue,
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
}
