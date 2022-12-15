import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { AliasService } from './alias.service';
import { CreateAliasDTO } from './dto/create-alias.dto';

@Controller('alias')
export class AliasController {
    constructor(
        private readonly aliasService: AliasService,
    ) {}

    @Post()
    async createAlias(@Body() body: CreateAliasDTO) {
        const alias = await this.aliasService.createAlias(body);
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
