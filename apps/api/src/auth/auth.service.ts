import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateAccountDTO } from '../account/dto';
import { LoginDTO } from './dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly tokenService: TokenService,
  ) {}

  // request password reset
  async forgotPassword(email: string) {
    const account = await this.accountService.findByEmail(email);
    if (!account) {
      return;
    }
    // You cannot reset password for accounts registered with OAuth provider (passwordless)
    if (!account.password) {
      return;
    }

    const resetToken = await this.tokenService.createResetToken(account.id);
    console.log('Use this token to reset password:', resetToken);
  }

  async login(data: LoginDTO) {
    return this.accountService.findByEmailAndPass(data.email, data.password);
  }

  async register(data: CreateAccountDTO) {
    const alreadyExists = await this.accountService.accountExists(data.email);
    if (alreadyExists) {
      return;
    }

    const account = await this.accountService.createAccount(data);
    if (!account) {
      return;
    }
    const verificationToken = await this.tokenService.createVerificationToken(
      account.id,
    );
    console.log('Use this token to verify email:', verificationToken);

    return account;
  }
}
