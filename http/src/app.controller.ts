import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ValidationPipe } from './common/validator.pipe';
import { UrlSchema } from './app.schema';
import { DomainPipe } from './common/domain.pipe';
import { TokenService } from './token/token.service';
import { Request } from 'express';

const domainBlacklist = [
  'localhost',
]

const CreateMappingPipes = [
  new ValidationPipe(UrlSchema),
  new DomainPipe(domainBlacklist)
]

@Controller()
export class AppController {
  constructor(
    private readonly tokenService: TokenService,
    ) {}

  @Post()
  createMapping(
    @Body('url', ...CreateMappingPipes) longUrl: string,
    @Req() req: Request
  ) {
    const { hostname } = new URL(longUrl);
    if (hostname === req.hostname) {
      throw new BadRequestException('Same domain is not allowed!');
    }

    const counter = Number.MAX_SAFE_INTEGER;
    const token = this.tokenService.generateToken(counter);
    const document = {
      longUrl,
      token,
      counter,
      datetime: Date.now(),
    }

    return document;
  }
}
