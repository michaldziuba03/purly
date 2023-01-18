import { IsEmail, IsString, Length } from 'class-validator';
import {
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../account.constants';

export class CreateAccountDTO {
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
