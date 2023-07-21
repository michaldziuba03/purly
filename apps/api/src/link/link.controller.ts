import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLink } from './usecases/create-link.usecase';
import { DeleteLink } from './usecases/delete-link.usecase';
import { UpdateLink } from './usecases/update-link.usecase';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { GetLink } from './usecases/get-link.usecase';
import { ListLinks } from './usecases/list-links.usecase';
import { Membership } from '../workspace/framework/membership.decorator';
import { Member } from '@purly/database';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { BaseController } from '../shared/base.controller';

// link controller - for managing links from the workspace by authorized users.
@BaseController('links')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthenticatedGuard, MembershipGuard)
export class LinkController {
  constructor(
    private readonly getLinkUsecase: GetLink,
    private readonly listLinksUsecase: ListLinks,
    private readonly createLinkUsecase: CreateLink,
    private readonly deleteLinkUsecase: DeleteLink,
    private readonly updateLinkUsecase: UpdateLink
  ) {}

  @Get()
  getLinks(@Membership() member: Member) {
    return this.listLinksUsecase.execute({
      workspaceId: member.workspaceId,
    });
  }

  @Post()
  createLink(
    @Membership('workspaceId') workspaceId: string,
    @Body() body: CreateLinkDto
  ) {
    return this.createLinkUsecase.execute({
      url: body.url,
      name: body.name,
      expiresAt: body.expiresAt,
      workspaceId,
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

  @Get(':linkId')
  async getLink(
    @Membership('workspaceId') workspaceId: string,
    @Param('linkId') linkId: string
  ) {
    const link = await this.getLinkUsecase.execute({
      linkId,
      workspaceId,
    });
    if (!link) {
      throw new NotFoundException();
    }

    return link;
  }

  @Post(':linkId')
  updateLink(
    @Membership('workspaceId') workspaceId: string,
    @Body() body: UpdateLinkDto,
    @Param('linkId') linkId: string
  ) {
    return this.updateLinkUsecase.execute({
      linkId,
      workspaceId,
      name: body.name,
      expiresAt: body.expiresAt,
      isActive: body.isActive,
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
  }

  @Delete(':linkId')
  async deleteLink(
    @Membership('workspaceId') workspaceId: string,
    @Param('linkId') linkId: string
  ) {
    const isDeleted = await this.deleteLinkUsecase.execute({
      linkId,
      workspaceId,
    });

    return { success: isDeleted };
  }
}
