import { Controller, Post, Body, Get, Param, NotFoundException, UseGuards, Delete, Res } from '@nestjs/common';
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

    @Get(':token/redirect')
    async redirect(@Param('token') token: string, @Res() res) {
        const alias = await this.aliasService.findAlias(token);
        if (!alias) {
            throw new NotFoundException();
        }

        if (alias.enableTracking) {
            // send data to queue for analitics (ip, user-agent)
        }

        return res.status(302).redirect(alias.url);
    }

    @Delete(':token')
    @UseGuards(new AuthGuard())
    async deleteAlias(@Param('token') token: string, @User('id') userId: string) {
        const isDeleted = await this.aliasService.deleteAlias(token, userId);
        if (!isDeleted) {
            throw new NotFoundException();
        }

        return;
    }
}
