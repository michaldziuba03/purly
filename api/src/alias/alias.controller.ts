import { Controller, Post, Body } from '@nestjs/common';
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
}
