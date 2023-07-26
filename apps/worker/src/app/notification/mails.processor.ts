import { Logger } from '@nestjs/common';
import { MailerService } from '@purly/mailer';
import {
  IResetPasswordEmail,
  IVerificationEmail,
  MAILS_QUEUE,
  MailJobs,
} from '@purly/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor(MAILS_QUEUE)
export class MailsProcessor extends WorkerHost {
  constructor(private readonly mailer: MailerService) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case MailJobs.VERIFICATION:
        return await this.sendWelcomeEmail(job.data);
      case MailJobs.RESET_PASSWORD:
        return await this.sendResetEmail(job.data);
      case MailJobs.REPORT:
        break;
    }
  }

  async sendWelcomeEmail(data: IVerificationEmail) {
    Logger.log('Sending welcome email with verification link');
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
    Logger.log('Sending email with reset password link...');
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
}
