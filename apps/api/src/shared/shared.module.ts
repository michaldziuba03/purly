import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountRepository,
  AccountSchema,
  Report,
  ReportRepository,
  ReportSchema,
  ResetToken,
  ResetTokenRepository,
  ResetTokenSchema,
} from '@libs/data';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: ResetToken.name, schema: ResetTokenSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  providers: [AccountRepository, ResetTokenRepository, ReportRepository],
  exports: [AccountRepository, ResetTokenRepository, ReportRepository],
})
export class SharedModule {}
