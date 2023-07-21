import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MailerOptions } from './mailer.interface';

export const {
  ConfigurableModuleClass: MailerBaseModule,
  MODULE_OPTIONS_TOKEN: MAILER_OPTIONS,
} = new ConfigurableModuleBuilder<MailerOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createMailerOptions')
  .build();
