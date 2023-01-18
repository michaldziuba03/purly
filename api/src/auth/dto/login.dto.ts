import { IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../account/account.constants';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
