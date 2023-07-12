import { IsEmail, IsString, Length } from 'class-validator';
import {
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../../user/user.constants';
import { Trim } from '../../shared/trim.transformer';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Trim()
  @Length(NAME_MIN, NAME_MAX)
  username: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
