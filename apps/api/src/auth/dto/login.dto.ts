import { IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../user/user.constants';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
