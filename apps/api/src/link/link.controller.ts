import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { LinkService } from './link.service';
import { UserSession } from '../shared/decorators/user.decorator';
import { ShortenLinkDto, PaginatedLinksQueryDto } from './dto';
import { Request } from 'express';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  shortenLink(@UserSession('id') userId: string, @Body() body: ShortenLinkDto) {
    return this.linkService.shortenUrl(body.url, userId);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getShortenedLinks(
    @UserSession('id') userId: string,
    @Query() query: PaginatedLinksQueryDto,
  ) {
    return this.linkService.getLinksByUser(userId, query.limit, query.page);
  }

  @Get(':alias')
  async getShortenedLinkByAlias(@Param('alias') alias: string) {
    const link = await this.linkService.getLink(alias);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }

  // probably I will move this part to handle by web app (Next.js) or configure reverse proxy
  @Get(':alias/redirect')
  async redirectToLink(@Param('alias') alias: string, @Req() req: Request) {
    const link = await this.linkService.getLink(alias);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // Most challenging part: design time-series stats for high-volume data
    // 1. Precompute stats on daily-window and cache in Redis
    // 2. Insert job with aggregation:dd-mm-yyyy as unique id to BullMQ with delay to persist cached stats in MongoDB
    // 3. Create similar flow for consuming subscription usage as well
    // 4. Try to ensure idempotency what is the hardest part actually due to distributed nature

    return req.res.redirect(link.url);
  }

  @Delete(':alias')
  @UseGuards(AuthenticatedGuard)
  async deleteShortenedLink(
    @UserSession('id') userId: string,
    @Param('alias') alias: string,
  ) {
    const isDeleted = await this.linkService.deleteLink(alias, userId);
    return { deleted: isDeleted };
  }
}
