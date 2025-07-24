import { Injectable } from '@nestjs/common';
import type { LoginDto } from '@purly/schemas/auth.schema';

@Injectable()
export class AuthService {
  async login(payload: LoginDto) {
    console.log('Login attempt with payload:', payload);
  }
}
