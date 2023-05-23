import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MailService } from './mail.service';
import { Job } from 'bullmq';
import {
  MAIL_QUEUE,
  MailJobs,
  ReportPayload,
  ResetPasswordPayload,
  VerificationPayload,
} from '@libs/jobs';
import { Logger } from '@nestjs/common';

@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  process(job: Job) {
    Logger.log(`Mail processor got job: ${job.name}`, 'Mailer queue');
    // switch statement to handle named jobs just like in legacy Bull.js
    switch (job.name) {
      case MailJobs.Reset:
        return this.sendResetLink(job);
      case MailJobs.Verification:
        return this.sendVerificationLink(job);
      case MailJobs.Report:
        return this.sendReport(job);
    }
  }

  async sendResetLink(job: Job<ResetPasswordPayload>) {
    await this.mailService.sendResetEmail(job.data);
  }

  async sendVerificationLink(job: Job<VerificationPayload>) {
    await this.mailService.sendVerificationEmail(job.data);
  }

  async sendReport(job: Job<ReportPayload>) {
    await this.mailService.sendReportEmail(job.data);
  }
}
