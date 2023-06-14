import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetProfile } from './usecases/get-profile.usecase';
import { UpdateProfile } from './usecases/update-profile.usecase';

@Module({
  controllers: [UserController],
  providers: [GetProfile, UpdateProfile],
})
export class UserModule {}
