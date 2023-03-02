import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  ResetTokenRepository,
  VerificationTokenRepository,
} from './token.repository';
import { TransactionSession } from '../database/transaction.manager';

@Injectable()
export class TokenService {
  constructor(
    private readonly verificationTokenRepo: VerificationTokenRepository,
    private readonly resetTokenRepo: ResetTokenRepository,
  ) {}

  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private generateToken(size: number): Promise<string> {
    return new Promise((resolve, reject) => {
      return crypto.randomBytes(size, (err, buff) => {
        if (err) return reject(err);

        return resolve(buff.toString('base64url'));
      });
    });
  }

  async createResetToken(userId: string) {
    const token = await this.generateToken(64);
    const hashedToken = this.hashToken(token);

    await this.resetTokenRepo.create({
      userId,
      token: hashedToken,
      createdAt: new Date(),
    });

    return token;
  }

  async consumeResetToken(plainToken: string, transaction: TransactionSession) {
    const token = this.hashToken(plainToken);
    const tokenMeta = await this.resetTokenRepo.findOne({ token });
    if (!tokenMeta) {
      return;
    }

    await this.resetTokenRepo.deleteMany(
      { userId: tokenMeta.userId },
      { transaction },
    );

    return tokenMeta;
  }

  async createVerificationToken(userId: string) {
    const token = await this.generateToken(128);

    await this.verificationTokenRepo.create({
      userId,
      token,
      createdAt: new Date(),
    });

    return token;
  }

  async getVerificationToken(userId: string) {
    // application will try to reuse existing verification tokens (unlike reset tokens)
    const tokenMeta = await this.verificationTokenRepo.findOne({ userId });
    if (tokenMeta) {
      return tokenMeta.token;
    }

    return this.createVerificationToken(userId);
  }

  consumeVerificationToken(token: string, transaction: TransactionSession) {
    return this.verificationTokenRepo.findOneAndDelete(
      { token },
      { transaction }, // consuming verification token is supposed to be run in transaction
    );
  }
}
