import { MailerService } from '@purly/mailer';
import {
  IInviteEmail,
  IReportEmail,
  IResetPasswordEmail,
  IVerificationEmail,
  MAILS_QUEUE,
  MailJobs,
} from '@purly/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RecordJob } from '../../record-job.decorator';

@Processor(MAILS_QUEUE)
export class MailsProcessor extends WorkerHost {
  constructor(private readonly mailer: MailerService) {
    super();
  }

  @RecordJob()
  async process(job: Job) {
    switch (job.name) {
      case MailJobs.VERIFICATION:
        return await this.sendWelcomeEmail(job.data);
      case MailJobs.RESET_PASSWORD:
        return await this.sendResetEmail(job.data);
      case MailJobs.REPORT:
        return await this.sendReportEmail(job.data);
      case MailJobs.INVITE:
        return await this.sendInviteEmail(job.data);
    }
  }

  async sendWelcomeEmail(data: IVerificationEmail) {
    await this.mailer.sendMail(
      {
        template: 'verification',
        subject: `Welcome in Purly, ${data.username}`,
        to: data.email,
      },
      {
        username: data.username,
        email: data.email,
      }
    );
  }

  async sendResetEmail(data: IResetPasswordEmail) {
    await this.mailer.sendMail(
      {
        template: 'reset-password',
        subject: `We got reset password request - Purly`,
        to: data.email,
      },
      {
        username: data.username,
        email: data.email,
        resetLink: data.resetLink,
      }
    );
  }

  async sendReportEmail(data: IReportEmail) {
    await this.mailer.sendMail(
      {
        template: 'report',
        subject: `Report: ${data.linkId}`,
        to: process.env.REPORT_MAIL,
      },
      data
    );
  }

  async sendInviteEmail(data: IInviteEmail) {
    await this.mailer.sendMail(
      {
        template: 'invite',
        subject: 'Invite to workspace',
        to: data.email,
      },
      data
    );
  }
}
