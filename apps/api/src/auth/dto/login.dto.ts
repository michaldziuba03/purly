import { IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../account/account.constants';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
