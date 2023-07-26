import { Module } from '@nestjs/common';
import { MailerModule } from '@purly/mailer';
import { join } from 'path';
import { MailsProcessor } from './mails.processor';

@Module({
  providers: [MailsProcessor],
  imports: [
    MailerModule.forRoot({
      templateDir: join(__dirname, 'assets'), // based on nx output in dist folder
      defaults: {
        from: 'Purly <noreply@michaldziuba.dev>',
      },
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
})
export class NotificationModule {}
