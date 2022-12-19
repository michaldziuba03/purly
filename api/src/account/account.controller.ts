import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AccountService } from './account.service';
import { UpdateAccountDTO } from './dto/update-account.dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
    ) {}

    @Put('me')
    @UseGuards(new AuthGuard())
    async updateAccount(@Body() body: UpdateAccountDTO, @User('id') userId: string) {
        const result = await this.accountService.updateAccount(userId, body);
        
        return result;
    }
}
