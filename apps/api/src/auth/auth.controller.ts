import { Body, Controller, Get, Post, Res } from '@nestjs/common';
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
import { SessionManager } from '@purly/security';
import { FastifyReply } from 'fastify';
import { User } from '@purly/db';
import { Session } from '../common/session.decorator';

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
  }

  @Get('session')
  async session(@Session() session: object) {
    return session;
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
    const maxAge = 86400;

    if (process.env.NODE_ENV === 'production') {
      res.header(
        'set-cookie',
        `session=${session.token}; Max-Age=${maxAge}; HttpOnly; Secure; Path=/; SameSite=Lax`,
      );
    } else {
      res.header(
        'set-cookie',
        `session=${session.token}; Max-Age=${maxAge}; HttpOnly; Path=/; SameSite=Lax`,
      );
    }
  }
}
