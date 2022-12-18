import { Controller, Post, Body, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AliasService } from './alias.service';
import { CreateAliasDTO } from './dto/create-alias.dto';

@Controller('alias')
export class AliasController {
    constructor(
        private readonly aliasService: AliasService,
    ) {}

    @Post()
    async createAlias(@Body() body: CreateAliasDTO, @User('id') userId: string) {
        const alias = await this.aliasService.createAlias(body, userId);
        return alias;
    }

    @Get(':token')
    async getAlias(@Param('token') token: string) {
        const alias = await this.aliasService.findAlias(token);
        if (!alias) {
            throw new NotFoundException();
        }

        return alias;
    }
}
