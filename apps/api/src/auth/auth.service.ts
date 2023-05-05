import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountRepository, ResetTokenRepository } from '@libs/data';
import * as argon2 from 'argon2';
import { generateGravatar, generateToken } from '../shared/utils';
import {
  RegisterDTO,
  LoginDTO,
  ResetPasswordRequestDTO,
  ResetPasswordDTO,
  VerifyAccountDto,
} from './dto';
import { QueueService } from '../shared/queue.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly resetTokenRepository: ResetTokenRepository,
    private readonly queueService: QueueService,
  ) {}

  private readonly VERIFICATION_TIME = 24 * 60 * 60 * 1000;

  async register(data: RegisterDTO) {
    const userExists = await this.accountRepository.exists({
      email: data.email,
    });

    if (userExists) {
      throw new BadRequestException('Account already exists');
    }

    const verificationToken = await generateToken(128);
    const hashedPassword = await argon2.hash(data.password);
    const account = await this.accountRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      picture: generateGravatar(data.email),
      verificationToken,
      verificationExpiration: Date.now() + this.VERIFICATION_TIME,
    });

    this.queueService.sendVerificationEmail({
      email: account.email,
      name: account.name,
      link: this.createVerificationLink(verificationToken),
    });

    return account;
  }

  async login(data: LoginDTO) {
    const account = await this.accountRepository.findByEmail(data.email);

    if (!account) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatching = await argon2.verify(account.password, data.password);
    if (!isMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return account;
  }

  async verifyAccount(data: VerifyAccountDto) {
    const account = await this.accountRepository.findAndVerify(data.token);
    if (!account) {
      throw new NotFoundException('Invalid verification token');
    }

    return account;
  }

  private createVerificationLink(token: string) {
    // TO-DO: replace base url with env variable
    return `http://localhost:3000/verify/${token}`;
  }

  async resendVerification(userId: string) {
    const account = await this.accountRepository.findById(userId);
    if (account.isVerified) {
      throw new BadRequestException('Account is already verified');
    }

    let link = this.createVerificationLink(account.verificationToken);
    const regenerateToken =
      this.VERIFICATION_TIME / 2 > account.verificationExpiration - Date.now();

    if (regenerateToken) {
      const token = await generateToken(128);
      await this.accountRepository.updateOne(
        {
          _id: account.id,
        },
        {
          verificationToken: token,
          verificationExpiration: Date.now() + this.VERIFICATION_TIME,
        },
      );

      link = this.createVerificationLink(token);
    }

    this.queueService.sendVerificationEmail({
      email: account.email,
      name: account.name,
      link,
    });

    return { email: account.email };
  }

  async resetPasswordRequest(
    data: ResetPasswordRequestDTO,
    metadata: { ip: string; agent: string },
  ) {
    const account = await this.accountRepository.findByEmail(data.email);
    if (!account) {
      return;
    }
    // handle accounts registered with OAuth providers:
    if (!account.password) {
      return;
    }

    const token = await generateToken(64);
    await this.resetTokenRepository.createResetToken(account.id, token);
    console.log('Reset token:', token);

    this.queueService.sendResetEmail({
      name: account.name,
      email: account.email,
      agent: metadata.agent,
      ip: metadata.ip,
      // TO-DO: replace base url with env variable
      link: `http://localhost:3000/auth/reset/${token}`,
    });
  }

  async resetPassword(data: ResetPasswordDTO) {
    const resetMeta = await this.resetTokenRepository.findByToken(data.token);
    if (!resetMeta) {
      throw new NotFoundException('Invalid reset token');
    }

    const hashedPassword = await argon2.hash(data.password);
    const account = await this.accountRepository.findOneAndUpdate(
      {
        id: resetMeta.userId,
      },
      {
        password: hashedPassword,
      },
    );

    await this.resetTokenRepository.clearTokens(resetMeta.userId);

    return account;
  }
}
