import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  LoginDto,
  LoginSchema,
  RegisterDto,
  RegisterSchema,
  ResetPasswordDto,
  ResetPasswordRequestDto,
  ResetPasswordRequestSchema,
  ResetPasswordSchema,
} from '@purly/schemas/auth.schema';
import { v } from '../common/validator.pipe';
import { AuthService } from './auth.service';
import { ISession, SessionManager } from '@purly/security';
import { User } from '@purly/db';
import { AuthGuard, SESSION_COOKIE_NAME } from './auth.guard';
import type { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionManager: SessionManager,
  ) {}

  @Post('register')
  register(@Body(v(RegisterSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body(v(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const user = await this.authService.login(body);
    await this.setSession(res, user);

    return user;
  }

  @Get('session')
  @UseGuards(AuthGuard)
  async getSession(@Session() session: ISession) {
    return session;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(
    @Res({ passthrough: true }) res: FastifyReply,
    @Session() session: ISession,
  ) {
    await this.sessionManager.deleteSession(session.id);
    res.clearCookie(SESSION_COOKIE_NAME);
  }

  @Post('reset/request')
  forgotPassword(
    @Body(v(ResetPasswordRequestSchema))
    body: ResetPasswordRequestDto,
  ) {
    return this.authService.resetPasswordRequest(body);
  }

  @Post('reset')
  resetPassword(
    @Body(v(ResetPasswordSchema))
    body: ResetPasswordDto,
  ) {
    return this.authService.changePassword(body);
  }

  private async setSession(res: FastifyReply, user: User) {
    const session = await this.sessionManager.createSession(user.id);

    res.setCookie(SESSION_COOKIE_NAME, session.token, {
      maxAge: 86400,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
  }
}
