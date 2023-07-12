import { Module } from '@nestjs/common';
import { GetProfile } from './usecases/get-profile.usecase';
import { UpdateProfile } from './usecases/update-profile.usecase';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [GetProfile, UpdateProfile],
})
export class UserModule {}
