import { IsString, Length } from 'class-validator';
import { USER_NAME_MAX, USER_NAME_MIN } from '@purly/shared';
import { Trim } from '../../shared/trim.transformer';

export class UpdateProfileDto {
  @IsString()
  @Trim()
  @Length(USER_NAME_MIN, USER_NAME_MAX)
  username: string;
}
