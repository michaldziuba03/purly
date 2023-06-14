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

@Controller('links')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthenticatedGuard)
export class LinkController {
  constructor(
    private readonly getLinkUsecase: GetLink,
    private readonly createLinkUsecase: CreateLink,
    private readonly deleteLinkUsecase: DeleteLink,
    private readonly updateLinkUsecase: UpdateLink
  ) {}

  @Get()
  getLinks(
    @UserSession('id') userId: string,
    @Query() query: GetLinksQueryDto
  ) {
    throw new Error('Not implemented');
  }

  @Post()
  createLink(@UserSession('id') userId: string, @Body() body: CreateLinkDto) {
    return this.createLinkUsecase.execute({
      url: body.url,
      name: body.name,
      userId,
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
  updateLink(
    @UserSession('id') userId: string,
    @Body() body: UpdateLinkDto,
    @Param('alias') alias: string
  ) {
    throw new Error('Not implemented');
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
