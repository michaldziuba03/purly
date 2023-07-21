import { Inject, Injectable } from '@nestjs/common';
import { SendMailOptions, Transporter } from 'nodemailer';
import { MAILER_TRANSPORTER } from './transport.provider';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { compile } from 'handlebars';
import { htmlToText } from 'html-to-text';
import { MAILER_OPTIONS } from './mailer-base.module';
import { MailerOptions, SendOptions } from './mailer.interface';

@Injectable()
export class MailerService {
  private readonly compiledTemplates = new Map<
    string,
    HandlebarsTemplateDelegate
  >();
  private readonly defaults: SendMailOptions;

  constructor(
    @Inject(MAILER_TRANSPORTER)
    private readonly transporter: Transporter,
    @Inject(MAILER_OPTIONS)
    private readonly moduleOptions: MailerOptions
  ) {
    this.defaults = moduleOptions.defaults || {};
  }

  async sendMail(options: SendOptions, ctx?: object) {
    const html = await this.readTemplate(options.template, ctx);
    const text = htmlToText(html);

    return this.transporter.sendMail({
      ...this.defaults,
      to: options.to || this.defaults.to,
      from: options.from || this.defaults.from,
      subject: options.subject || this.defaults.subject,
      html,
      text,
    });
  }

  async readTemplate(templateName: string, ctx: object = {}): Promise<string> {
    const existingTemplate = this.compiledTemplates.get(templateName);
    if (existingTemplate) {
      return existingTemplate(ctx);
    }

    const templatePath = join(
      this.moduleOptions.templateDir,
      `${templateName}.hbs`
    );
    const template = await readFile(templatePath, 'utf-8');

    const compiledTemplate = compile(template);
    this.compiledTemplates.set(templateName, compiledTemplate);

    return compiledTemplate(ctx);
  }
}
