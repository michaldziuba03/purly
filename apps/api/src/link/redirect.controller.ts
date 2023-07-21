import { Get, Ip, Param, Req, Headers, Controller } from '@nestjs/common';
import { RedirectLink } from './usecases/redirect-link.usecase';
import { getRefererHost } from '../shared/utils';
import type { Request } from 'express';

// redirect controller - for "consuming" link by alias.
@Controller('redirect')
export class RedirectController {
  constructor(private readonly redirectLinkUsecase: RedirectLink) {}

  @Get(':alias')
  async redirect(
    @Req() req: Request,
    @Param('alias') alias: string,
    @Ip() remoteAddress: string,
    @Headers('referer') referer?: string,
    @Headers('user-agent') userAgent?: string
  ) {
    const destination = await this.redirectLinkUsecase.execute({
      alias,
      remoteAddress,
      userAgent,
      referer: getRefererHost(referer),
    });

    if (!destination) {
      return req.res.redirect(process.env.CLIENT_URL);
    }

    return req.res.redirect(destination);
  }
}
