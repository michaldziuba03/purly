import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBioDto } from './dto/create-bio.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import {
  AuthenticatedGuard,
  OptionalAuth,
} from '../auth/guards/authenticated.guard';
import { UserSession } from '../shared/user.decorator';
import { CreateBio } from './usecases/create-bio.usecase';
import { GetBioPage } from './usecases/get-bio.usecase';
import { GetMyBioPage } from './usecases/get-my-bio.usecase';
import { DeleteBio } from './usecases/delete-bio.usecase';
import { AddButton } from './usecases/add-button.usecase';
import { AddButtonDto } from './dto/add-button.dto';
import { UpdateBio } from './usecases/update-bio.usecase';
import { DeleteButton } from './usecases/delete-button.usecase';

@Controller('bio')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BioController {
  constructor(
    private readonly createBioUsecase: CreateBio,
    private readonly updateBioUsecase: UpdateBio,
    private readonly getBioUsecase: GetBioPage,
    private readonly getMyBioUsecase: GetMyBioPage,
    private readonly deleteBioUsecase: DeleteBio,
    private readonly addButtonUsecase: AddButton,
    private readonly deleteButtonUsecase: DeleteButton
  ) {}

  @Post('me')
  createBio(@UserSession('id') userId: string, @Body() body: CreateBioDto) {
    return this.createBioUsecase.execute({
      name: body.name,
      userId,
    });
  }

  @Get('me')
  async getMyBio(@UserSession('id') userId: string) {
    const page = await this.getMyBioUsecase.execute({ userId });
    if (!page) {
      throw new NotFoundException();
    }

    return page;
  }

  @Get(':name')
  @OptionalAuth()
  async getBio(@Param('name') name: string) {
    const page = await this.getBioUsecase.execute({ name });
    if (!page) {
      throw new NotFoundException();
    }

    return page;
  }

  @Post('me/buttons')
  addButton(@UserSession('id') userId: string, @Body() body: AddButtonDto) {
    return this.addButtonUsecase.execute({
      label: body.label,
      url: body.url,
      userId,
    });
  }

  @Delete('me/buttons/:blockId')
  async deleteButton(
    @UserSession('id') userId: string,
    @Param('blockId') blockId: string
  ) {
    return this.deleteButtonUsecase.execute({
      blockId,
      userId,
    });
  }

  @Put('me')
  updateBio(@UserSession('id') userId: string, @Body() body: UpdateBioDto) {
    return this.updateBioUsecase.execute({
      userId,
      title: body.title,
      description: body.description,
    });
  }

  @Delete('me')
  deleteBio(@UserSession('id') userId: string) {
    return this.deleteBioUsecase.execute({
      userId,
    });
  }
}
