import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TokenSchema, UrlSchema } from './mappings.validations';
import { DomainPipe } from 'src/common/domain.pipe';
import { ValidationPipe } from 'src/common/validator.pipe';
import { TokenService } from 'src/token/token.service';
import { MappingService } from './mappings.service';
import * as domainBlacklist from '../domain-blacklist.json';
import { CounterService } from 'src/counter/counter.service';

const CreateMappingPipes = [
  new ValidationPipe(UrlSchema),
  new DomainPipe(domainBlacklist)
]

const GetMappingPipes = [ new ValidationPipe(TokenSchema) ];

@Controller()
export class MappingsController {
    constructor(
        private readonly tokenService: TokenService,
        private readonly mappingService: MappingService,
        private readonly counterService: CounterService,
    ) {}

    @Get(':token')
    async getMapping(
        @Param('token', ...GetMappingPipes) token: string
    ) {
        const mapping = await this.mappingService.getUrl(token);
        if (!mapping) {
            throw new NotFoundException();
        }

        return mapping;
    }

    @Post()
    async createMapping(
      @Body('url', ...CreateMappingPipes) longUrl: string,
      @Req() req: Request
    ) {
      const { hostname } = new URL(longUrl);
      if (hostname === req.hostname) {
        throw new BadRequestException('Same domain is not allowed!');
      }

      const counter = this.counterService.getValueAndIncrement();
      const token = this.tokenService.generateToken(counter);
      const result = await this.mappingService.createMapping({
          token,
          url: longUrl,
          counter,
      });

      return {
        token,
      };
    }
}
