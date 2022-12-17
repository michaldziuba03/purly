import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDTO } from 'src/account/dto/create-account.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    register(@Body() data: CreateAccountDTO) {
        return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginDTO) {
        const account = await this.authService.login(data);
        if (!account) {
            throw new BadRequestException('Invalid email or password');
        }

        return account;
    }
}
