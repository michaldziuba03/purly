import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { S3Service } from '../../upload/s3.service';

interface IUpdateProfileCommand {
  userId: string;
  username?: string;
  pictureFile?: string;
}

@Injectable()
export class UpdateProfile implements Usecase<IUpdateProfileCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service
  ) {}

  async execute(command: IUpdateProfileCommand) {
    const pictureKey = await this.getPictureKey(command);
    const user = await this.userRepository.updateById(command.userId, {
      username: command.username,
      pictureKey,
    });

    return user;
  }

  async getPictureKey(command: IUpdateProfileCommand) {
    if (!command.pictureFile) {
      return;
    }

    const key = `${command.userId}/${command.pictureFile}`;
    const isUploaded = await this.s3Service.isUploaded(key);
    if (!isUploaded) {
      throw new NotFoundException('Uploaded file not found');
    }

    return key;
  }
}
