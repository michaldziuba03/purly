import { BadRequestException, Body, Controller, Post, Session } from '@nestjs/common';
import { CreateAccountDTO } from 'src/account/dto/create-account.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Session as CookieSession } from '@fastify/secure-session';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() data: CreateAccountDTO) {
            const account = await this.authService.register(data);
            if (!account) {
                throw new BadRequestException('Account already exists');
            }

            return account;
    }

    @Post('login')
    async login(@Body() data: LoginDTO, @Session() session: CookieSession) {
        const account = await this.authService.login(data);
        if (!account) {
            throw new BadRequestException('Invalid email or password');
        }

        session.set('userId', account.id);
        return account;
    }
}
