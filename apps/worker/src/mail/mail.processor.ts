import { Process, Processor } from '@nestjs/bull';
import { MailService } from './mail.service';
import { Job } from 'bull';
import {
  MAIL_QUEUE,
  MailJobs,
  ReportPayload,
  ResetPasswordPayload,
  VerificationPayload,
} from '@libs/jobs';

@Processor(MAIL_QUEUE)
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(MailJobs.Reset)
  async sendResetLink(job: Job<ResetPasswordPayload>) {
    console.log(job);
    await this.mailService.sendResetEmail(job.data);
  }

  @Process(MailJobs.Verification)
  async sendVerificationLink(job: Job<VerificationPayload>) {
    await this.mailService.sendVerificationEmail(job.data);
  }

  @Process(MailJobs.Report)
  async sendReport(job: Job<ReportPayload>) {
    await this.mailService.sendReportEmail(job.data);
  }
}
