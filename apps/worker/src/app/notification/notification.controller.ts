import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailerService } from '@purly/mailer';

@Controller()
export class NotificationController {
  constructor(private readonly mailer: MailerService) {}

  @EventPattern('user.created')
  sendWelcomeEmail() {
    const username = 'Michał';
    const email = 'mail@michaldziuba.dev';

    this.mailer.sendMail(
      {
        template: 'welcome',
        subject: `Welcome in Purly, ${name}`,
        to: email,
      },
      {
        username,
        email,
      }
    );
  }

  @EventPattern('user.password.reset')
  sendResetEmail() {
    const username = 'Michał';
    const email = 'mail@michaldziuba.dev';
    const resetLink =
      'http://localhost:4200/auth/reset/2qfhqudhrfudrhgurehgerq2ew';

    this.mailer.sendMail(
      {
        template: 'reset-password',
        subject: `Welcome in Purly, ${name}`,
        to: email,
      },
      {
        username,
        email,
        resetLink,
      }
    );
  }
}
