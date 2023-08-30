import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { S3Service } from './s3.service';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserSession } from '../shared/user.decorator';
import { nanoid } from 'nanoid/async';
import { UploadPictureDto } from './dto/upload-picture.dto';

@Controller('uploads')
@UseGuards(AuthenticatedGuard)
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  async uploadPicture(
    @UserSession('id') userId: string,
    @Body() body: UploadPictureDto
  ) {
    const identifier = await nanoid(32);
    const file = `${identifier}.${body.format}`;
    const key = `${userId}/${file}`;
    const mimeType = `image/${body.format}`;

    const result = await this.s3Service.presignUrl(key, mimeType);

    return { ...result, file };
  }
}
