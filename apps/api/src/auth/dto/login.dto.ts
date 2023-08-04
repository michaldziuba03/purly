import { IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '@purly/shared';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
