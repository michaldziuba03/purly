import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordPayload } from '@libs/jobs';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendResetEmail(data: ResetPasswordPayload) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: 'Reset password request - URL Shortener',
      text: `Reset password request. Your reset link: ${data.link}`,
      template: 'reset',
      context: {
        link: data.link,
        name: data.name,
      },
    });
  }
}
