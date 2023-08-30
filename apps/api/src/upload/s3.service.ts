import { Injectable } from '@nestjs/common';
import { S3Client, HeadObjectCommand, NotFound } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async presignUrl(key: string, contentType: string) {
    const result = await createPresignedPost(this.s3, {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Fields: {
        key,
        'Content-Type': contentType,
      },
      Expires: 900,
      Conditions: [
        ['eq', '$Content-Type', contentType],
        ['content-length-range', 100, 5_000_000], // 100 bytes - 5MB
      ],
    });

    return result;
  }

  async isUploaded(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      });

      const result = await this.s3.send(command);
      if (!result) return false;

      return true;
    } catch (err) {
      if (err instanceof NotFound) {
        return false;
      }

      throw err;
    }
  }
}
