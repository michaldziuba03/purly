import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserSession } from '../shared/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UpdateProfile } from './usecases/update-profile.usecase';
import { GetProfile } from './usecases/get-profile.usecase';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(
    private readonly updateProfileUsecase: UpdateProfile,
    private readonly getProfileUsecase: GetProfile
  ) {}

  @Patch('me')
  async updateProfile(
    @UserSession('id') userId: string,
    @Body() body: UpdateProfileDto
  ) {
    const user = await this.updateProfileUsecase.execute({
      userId,
      username: body.username,
      pictureFile: body.pictureFile,
    });

    return user;
  }

  @Get('me')
  async getProfile(@UserSession('id') userId: string) {
    const user = await this.getProfileUsecase.execute({
      userId,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
