import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../../upload/s3.service';
import { Usecase } from '../../shared/base.usecase';
import { UserRepository } from '@purly/database';

interface IUpdateAvatarCommand {
  file: string;
  userId: string;
}

@Injectable()
export class UpdateAvatar implements Usecase<IUpdateAvatarCommand> {
  constructor(
    private readonly s3Service: S3Service,
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: IUpdateAvatarCommand) {
    const key = `${command.userId}/${command.file}`;
    const isUploaded = await this.s3Service.isUploaded(key);
    if (!isUploaded) {
      throw new NotFoundException('Uploaded file not found');
    }

    const result = await this.userRepository.updateById(command.userId, {
      pictureKey: key,
    });

    return result;
  }
}
