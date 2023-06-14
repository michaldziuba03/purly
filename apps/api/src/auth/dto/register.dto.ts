import { IsEmail, IsString, Length } from 'class-validator';
import {
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../../user/user.constants';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
