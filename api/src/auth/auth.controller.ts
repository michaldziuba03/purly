import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDTO } from '../account/dto';
import { User } from '../common/decorators/user.decorator';
import { Account } from '../account/account.schema';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { AnonGuard } from './guards/auth.guard';
import { mapEntity } from '../common/utils';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(new AnonGuard())
  @ApiResponse({ type: Account })
  async register(@Body() data: CreateAccountDTO) {
    const account = await this.authService.register(data);
    if (!account) {
      throw new BadRequestException('Account already exists');
    }

    return mapEntity(account, Account);
  }

  @Post('login')
  @UseGuards(new AnonGuard(), LocalAuthGuard)
  @ApiResponse({ type: Account })
  @ApiBody({ type: LoginDTO })
  login(@User() account: Account) {
    return mapEntity(account, Account);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.logOut({ keepSessionInfo: false }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    req.session.cookie.maxAge = 0;
  }
}
