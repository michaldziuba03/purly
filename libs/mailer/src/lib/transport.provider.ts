import { Provider } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MAILER_OPTIONS } from './mailer-base.module';
import { MailerOptions } from './mailer.interface';

export const MAILER_TRANSPORTER = 'MAILER_TRANSPORTER';

export const TransportProvider: Provider = {
  provide: MAILER_TRANSPORTER,
  inject: [MAILER_OPTIONS],
  useFactory: (options: MailerOptions) => {
    return createTransport(options.transport);
  },
};
