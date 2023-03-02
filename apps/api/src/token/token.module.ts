import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import {
  ResetTokenRepository,
  VerificationTokenRepository,
} from './token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResetToken,
  ResetTokenSchema,
  VerificationToken,
  VerificationTokenSchema,
} from './token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResetToken.name, schema: ResetTokenSchema },
      { name: VerificationToken.name, schema: VerificationTokenSchema },
    ]),
  ],
  providers: [TokenService, ResetTokenRepository, VerificationTokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
