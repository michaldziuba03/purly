import { IsString, Length } from 'class-validator';

export class ConfirmUpload {
  @IsString()
  @Length(1, 1000)
  file: string;
}
