import { Body, Controller, Post } from '@nestjs/common';
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(v(RegisterSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body(v(LoginSchema)) body: LoginDto) {
    return this.authService.login(body);
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
}
