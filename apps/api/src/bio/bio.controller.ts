import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BaseController } from '../shared/base.controller';
import { CreateBioPage } from './usecases/create-bio-page.usecase';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { Membership } from '../workspace/framework/membership.decorator';
import { CreateBioPageDto } from './dto/create-bio-page.dto';
import { GetBioPage } from './usecases/get-bio-page.usecase';
import { UpdateBioPageDto } from './dto/update-bio-page.dto';
import { UpdateBioPage } from './usecases/update-bio-page.usecase';
import { AddElementDto } from './dto/add-bio-element.dto';
import { AddElement } from './usecases/add-element.usecase';
import { DeleteElement } from './usecases/delete-element.usecase';
import { UpdateElementDto } from './dto/update-bio-element.dto';
import { UpdateElement } from './usecases/update-element.usecase';

@BaseController('bio')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BioController {
  constructor(
    private readonly createBioPageUsecase: CreateBioPage,
    private readonly getBioPageUsecase: GetBioPage,
    private readonly updateBioPageUsecase: UpdateBioPage,
    private readonly addElementUsecase: AddElement,
    private readonly deleteElementUsecase: DeleteElement,
    private readonly updateElementUsecase: UpdateElement
  ) {}

  @Post()
  createPage(
    @Membership('workspaceId') workspaceId: string,
    @Body() body: CreateBioPageDto
  ) {
    return this.createBioPageUsecase.execute({
      workspaceId,
      identifier: body.identifier,
      description: body.description,
    });
  }

  @Get()
  getPage(@Membership('workspaceId') workspaceId: string) {
    return this.getBioPageUsecase.execute({
      workspaceId,
    });
  }

  @Patch()
  updatePage(
    @Membership('workspaceId') workspaceId: string,
    @Body() body: UpdateBioPageDto
  ) {
    return this.updateBioPageUsecase.execute({
      workspaceId,
      description: body.description,
      identifier: body.identifier,
      name: body.name,
    });
  }

  @Post('elements')
  addElement(
    @Membership('workspaceId') workspaceId: string,
    @Body() body: AddElementDto
  ) {
    return this.addElementUsecase.execute({
      workspaceId,
      label: body.label,
      url: body.url,
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

  @Patch('elements/:elementId')
  updateElement(
    @Membership('workspaceId') workspaceId: string,
    @Param('elementId') elementId: string,
    @Body() body: UpdateElementDto
  ) {
    return this.updateElementUsecase.execute({
      elementId,
      workspaceId,
      label: body.label,
    });
  }
}
