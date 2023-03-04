import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { CreateLinkDTO } from './dto/create-link.dto';
import { User } from '../common/decorators/user.decorator';

@Controller('links')
@UseGuards(AuthenticatedGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() data: CreateLinkDTO, @User('id') userId: string) {
    return this.linkService.shortenUrl(data.url, userId);
  }

  // TODO: implement proper pagination
  @Get()
  list(@User('id') userId: string) {
    return this.linkService.getLinksByUser(userId);
  }

  @Get(':alias')
  async details(@Param('alias') alias: string) {
    const link = await this.linkService.getLink(alias);
    if (!link) {
      throw new NotFoundException();
    }

    return link;
  }

  @Delete(':alias')
  async delete(@Param('alias') alias: string, @User('id') userId: string) {
    const isDeleted = await this.linkService.deleteLink(alias, userId);
    if (!isDeleted) {
      throw new NotFoundException('Shortened link with given alias not found');
    }

    return;
  }
}
