import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserSession } from '../shared/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UpdateProfile } from './usecases/update-profile.usecase';
import { GetProfile } from './usecases/get-profile.usecase';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(
    private readonly updateProfileUsecase: UpdateProfile,
    private readonly getProfileUsecase: GetProfile
  ) {}

  @Post('me')
  async updateProfile(
    @UserSession() userId: string,
    @Body() data: UpdateProfileDto
  ) {
    const success = await this.updateProfileUsecase.execute({
      userId,
      name: data.name,
    });

    return { success };
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
