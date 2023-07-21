import { SendMailOptions, TransportOptions } from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface SendOptions {
  to?: string;
  from?: string;
  subject?: string;
  template: string;
}

export interface MailerOptions {
  templateDir: string;
  defaults?: Partial<SendMailOptions>;
  transport: TransportOptions | SMTPTransport.Options;
}
