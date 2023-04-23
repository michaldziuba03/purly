import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UserSession } from '../shared/decorators/user.decorator';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';

@Controller('account')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAuthenticatedAccount(@UserSession('id') userId: string) {
    return this.accountService.getAccount(userId);
  }

  @Post()
  updateAuthenticatedAccount(
    @UserSession('id') userId: string,
    @Body() data: UpdateAccountDTO,
  ) {
    return this.accountService.updateAccount(userId, data);
  }
}
