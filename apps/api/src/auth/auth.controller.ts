import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, LoginSchema } from '@purly/schemas/auth.schema';
import { zd } from '../common/validator.pipe';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body(zd(LoginSchema)) body: LoginDto) {
    // Logic for user login
    return { message: 'User logged in successfully', body };
  }
}
