import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { ResetToken, User } from '@purly/db';
import { Toolbox } from '@purly/security';
import type {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from '@purly/schemas/auth.schema';

@Injectable()
export class AuthService {
  private readonly RESET_TOKEN_LIFETIME = 1000 * 60 * 20;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: EntityRepository<ResetToken>,
  ) {}

  async register(payload: RegisterDto) {
    const count = await this.userRepository.count({ email: payload.email });
    if (count > 0) {
      throw new BadRequestException('User already exists');
    }

    const now = new Date();
    const passwordHash = await Toolbox.hash(payload.password);
    const user = this.userRepository.create({
      email: payload.email,
      password: passwordHash,
      username: payload.username,
      createdAt: now,
      updatedAt: now,
    });

    await this.userRepository.getEntityManager().persistAndFlush(user);

    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.userRepository.findOne({ email: payload.email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isValid = await Toolbox.verifyHash(payload.password, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }

  async resetPasswordRequest(payload: ResetPasswordRequestDto) {
    const user = await this.userRepository.findOne({ email: payload.email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = Toolbox.generateSecureRandomString();
    const hashedToken = Toolbox.createSHA256(token);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.RESET_TOKEN_LIFETIME);

    const resetToken = this.resetTokenRepository.create({
      user,
      token: hashedToken,
      createdAt: now,
      expiresAt,
    });

    await this.resetTokenRepository
      .getEntityManager()
      .persistAndFlush(resetToken);

    // TODO: Send the token to the user via email
    // For now, we will just return it for testing purposes
    // In production, you should never return the token directly

    return { token };
  }

  async changePassword(payload: ResetPasswordDto) {
    const metadata = await this.resetTokenRepository.findOne({
      token: Toolbox.createSHA256(payload.token),
    });
    if (!metadata) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const now = new Date();
    if (isAfter(now, metadata.expiresAt)) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await Toolbox.hash(payload.password);
    const [count] = await Promise.all([
      this.userRepository.nativeUpdate(
        { id: metadata.user.id },
        { password: hashedPassword, updatedAt: now },
      ),
      this.resetTokenRepository.nativeDelete({ token: metadata.token }),
    ]);

    const isUpdated = count > 0;
    if (!isUpdated) {
      throw new BadRequestException('Failed to update password');
    }
  }
}
