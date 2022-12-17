import { IsEmail, IsString } from "class-validator";

export class CreateAccountDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}