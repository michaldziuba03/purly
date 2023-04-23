import { IsEmail } from 'class-validator';

export class ResetPasswordRequestDTO {
  @IsEmail()
  email: string;
}
