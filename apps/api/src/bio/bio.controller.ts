import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
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

@Controller('bio')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BioController {
  constructor(
    private readonly createBioUsecase: CreateBio,
    private readonly getBioUsecase: GetBioPage
  ) {}

  @Post()
  createBio(@UserSession('id') userId: string, @Body() body: CreateBioDto) {
    return this.createBioUsecase.execute({
      name: body.name,
      userId,
    });
  }

  @Get()
  getMyBio(@UserSession('id') userId: string) {
    return;
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

  @Post(':name')
  updateBio(
    @UserSession('id') userId: string,
    @Param('name') name: string,
    @Body() body: UpdateBioDto
  ) {
    return;
  }

  @Delete(':name')
  deleteBio() {
    return;
  }
}
