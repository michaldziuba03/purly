import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [S3Service],
  controllers: [UploadController],
})
export class UploadModule {}
