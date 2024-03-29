import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BaseController } from '../shared/base.controller';
import { CreateLaunchpad } from './usecases/create-launchpad.usecase';
import { CreateLaunchpadDto } from './dto/create-launchpad.dto';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { Membership } from '../workspace/framework/membership.decorator';
import { Member } from '@purly/database';
import { GetLaunchpad } from './usecases/get-launchpad.usecase';
import { AddElement } from './usecases/add-element.usecase';
import { AddElementDto } from './dto/add-element.dto';
import { DeleteElement } from './usecases/delete-element.usecase';
import { UpdateLaunchpadDto } from './dto/update-launchpad';
import { UpdateLaunchpad } from './usecases/update-launchpad.usecase';

@BaseController('launchpads')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthenticatedGuard, MembershipGuard)
export class LaunchpadController {
  constructor(
    private readonly createLaunchpadUsecase: CreateLaunchpad,
    private readonly getLaunchpadUsecase: GetLaunchpad,
    private readonly updateLaunchpadUsecase: UpdateLaunchpad,
    private readonly addElementUsecase: AddElement,
    private readonly deleteElementUsecase: DeleteElement
  ) {}

  @Post()
  createLaunchpad(
    @Body() body: CreateLaunchpadDto,
    @Membership() member: Member
  ) {
    return this.createLaunchpadUsecase.execute({
      slug: body.slug,
      title: body.title,
      description: body.description,
      workspaceId: member.workspaceId,
    });
  }

  @Get()
  getLaunchpad(@Membership() member: Member) {
    return this.getLaunchpadUsecase.execute({
      workspaceId: member.workspaceId,
    });
  }

  @Put()
  updateLaunchpad(
    @Membership() member: Member,
    @Body() body: UpdateLaunchpadDto
  ) {
    return this.updateLaunchpadUsecase.execute({
      workspaceId: member.workspaceId,
      ...body,
    });
  }

  @Post('elements')
  addElement(@Body() body: AddElementDto, @Membership() member: Member) {
    return this.addElementUsecase.execute({
      workspaceId: member.workspaceId,
      linkId: body.linkId,
      url: body.url,
      label: body.label,
    });
  }

  @Delete('elements/:elementId')
  async deleteElement(
    @Membership('workspaceId') workspaceId: string,
    @Param('elementId') elementId: string
  ) {
    const isDeleted = await this.deleteElementUsecase.execute({
      workspaceId,
      elementId,
    });

    return { success: isDeleted };
  }
}
