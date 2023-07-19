import { IsEmail } from 'class-validator';

export class DeleteInviteDto {
  @IsEmail()
  email: string;
}
