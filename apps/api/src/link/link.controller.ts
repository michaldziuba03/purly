import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { LinkService } from './link.service';
import { UserSession } from '../shared/decorators/user.decorator';
import { ShortenLinkDto } from './dto/shorten-link.dto';

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
    @Query('page') page: string,
  ) {
    return this.linkService.getLinksByUser(userId, page);
  }

  @Get(':alias')
  async getShortenedLinkByAlias(@Param('alias') alias: string) {
    const link = await this.linkService.getLink(alias);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
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
