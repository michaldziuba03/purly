import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../user/user.constants';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
