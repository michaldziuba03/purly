import { IsEmail, IsString, Length } from "class-validator";
import { Trim } from "src/common/utils";

export class CreateAccountDTO {
    @IsString()
    @Length(2, 64)
    @Trim()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 100)
    password: string;
}