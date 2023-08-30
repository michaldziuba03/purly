import { IsIn } from 'class-validator';

export const VALID_IMAGE_FORMATS = ['png', 'jpg', 'jpeg'];

export class UploadPictureDto {
  @IsIn(VALID_IMAGE_FORMATS)
  format: string;
}
