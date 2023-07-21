import { Module } from '@nestjs/common';
import { MailerModule } from '@purly/mailer';
import { join } from 'path';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController],
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
