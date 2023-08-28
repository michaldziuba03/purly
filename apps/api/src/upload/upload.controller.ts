import { Controller, Post } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  async uploadFile() {
    const signedUrl = await this.s3Service.presignUrl('test', 'image/png');
    return { url: signedUrl };
  }
}
