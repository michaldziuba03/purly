import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailerService } from '@purly/mailer';
import { User } from '@purly/database';

@Controller()
export class NotificationController {
  constructor(private readonly mailer: MailerService) {}

  @EventPattern('user.created')
  sendWelcomeEmail(@Payload() data: User) {
    Logger.log('Handling user.created');
    console.log(data);

    this.mailer.sendMail(
      {
        template: 'welcome',
        subject: `Welcome in Purly, ${data.username}`,
        to: data.email,
      },
      {
        username: data.username,
        email: data.email,
      }
    );
  }

  @EventPattern('user.password.reset')
  sendResetEmail(@Payload() data: any) {
    Logger.log('Handling user.password.reset');
    this.mailer.sendMail(
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
