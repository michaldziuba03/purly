import { Module } from '@nestjs/common';
import { TransportProvider } from './transport.provider';
import { MailerService } from './mailer.service';
import { MailerBaseModule } from './mailer-base.module';

@Module({
  providers: [TransportProvider, MailerService],
  exports: [MailerService],
})
export class MailerModule extends MailerBaseModule {}
