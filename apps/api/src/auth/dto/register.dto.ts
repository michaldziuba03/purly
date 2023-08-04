import { IsEmail, IsString, Length } from 'class-validator';
import {
  USER_NAME_MAX,
  USER_NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '@purly/shared';
import { Trim } from '../../shared/trim.transformer';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Trim()
  @Length(USER_NAME_MIN, USER_NAME_MAX)
  username: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
