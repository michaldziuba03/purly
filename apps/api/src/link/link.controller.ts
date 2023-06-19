import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLink } from './usecases/create-link.usecase';
import { DeleteLink } from './usecases/delete-link.usecase';
import { UpdateLink } from './usecases/update-link.usecase';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { UserSession } from '../shared/user.decorator';
import { UpdateLinkDto } from './dto/update-link.dto';
import { GetLink } from './usecases/get-link.usecase';
import { GetLinksQueryDto } from './dto/get-links-query.dto';
import { GetLinksList } from './usecases/get-links-list.usecase';

@Controller('links')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthenticatedGuard)
export class LinkController {
  constructor(
    private readonly getLinkUsecase: GetLink,
    private readonly getLinksListUsecase: GetLinksList,
    private readonly createLinkUsecase: CreateLink,
    private readonly deleteLinkUsecase: DeleteLink,
    private readonly updateLinkUsecase: UpdateLink
  ) {}

  @Get()
  getLinks(
    @UserSession('id') userId: string,
    @Query() query: GetLinksQueryDto
  ) {
    return this.getLinksListUsecase.execute({
      userId,
    });
  }

  @Post()
  createLink(@UserSession('id') userId: string, @Body() body: CreateLinkDto) {
    return this.createLinkUsecase.execute({
      url: body.url,
      name: body.name,
      expiresAt: body.expiresAt,
      userId,
      enableUtm: body.enableUtm,
      utmCampaign: body.utmCampaign,
      utmContent: body.utmCampaign,
      utmMedium: body.utmMedium,
      utmTerm: body.utmTerm,
      utmSource: body.utmSource,
      androidRedirect: body.androidRedirect,
      iosRedirect: body.iosRedirect,
    });
  }

  @Get(':alias')
  async getLink(
    @UserSession('id') userId: string,
    @Param('alias') alias: string
  ) {
    const link = await this.getLinkUsecase.execute({ alias });
    if (!link) {
      throw new NotFoundException();
    }

    if (link.userId !== userId) {
      throw new NotFoundException();
    }

    return link;
  }

  @Post(':alias')
  async updateLink(
    @UserSession('id') userId: string,
    @Body() body: UpdateLinkDto,
    @Param('alias') alias: string
  ) {
    const isUpdated = await this.updateLinkUsecase.execute({
      alias,
      name: body.name,
      expiresAt: body.expiresAt,
      userId,
      isArchived: body.isArchived,
      url: body.url,
      enableUtm: body.enableUtm,
      utmCampaign: body.utmCampaign,
      utmContent: body.utmCampaign,
      utmMedium: body.utmMedium,
      utmTerm: body.utmTerm,
      utmSource: body.utmSource,
      androidRedirect: body.androidRedirect,
      iosRedirect: body.iosRedirect,
    });

    if (!isUpdated) {
      throw new NotFoundException();
    }

    return { success: isUpdated };
  }

  @Delete(':alias')
  async deleteLink(
    @UserSession('id') userId: string,
    @Param('alias') alias: string
  ) {
    const isDeleted = await this.deleteLinkUsecase.execute({
      alias,
      userId,
    });

    return { success: isDeleted };
  }
}
