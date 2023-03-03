import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}
