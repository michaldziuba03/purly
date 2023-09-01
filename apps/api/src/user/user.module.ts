import { Module } from '@nestjs/common';
import { GetProfile } from './usecases/get-profile.usecase';
import { UpdateProfile } from './usecases/update-profile.usecase';
import { UserController } from './user.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [GetProfile, UpdateProfile],
})
export class UserModule {}
