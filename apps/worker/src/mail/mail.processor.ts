import { Process, Processor } from '@nestjs/bull';
import { MailService } from './mail.service';
import { Job } from 'bull';
import { MAIL_QUEUE, MailJobs, ResetPasswordPayload } from '@libs/jobs';

@Processor(MAIL_QUEUE)
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(MailJobs.Reset)
  async sendResetLink(job: Job<ResetPasswordPayload>) {
    console.log(job);
    await this.mailService.sendResetEmail(job.data);
  }
}
