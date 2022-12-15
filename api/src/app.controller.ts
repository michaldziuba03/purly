import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AliasService } from './alias/alias.service';

@Controller()
export class AppController {
    constructor(
        private readonly aliasService: AliasService,
    ) {}
}
