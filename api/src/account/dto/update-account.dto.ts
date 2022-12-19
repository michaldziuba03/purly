import { IsString } from "class-validator";
import { Trim } from "src/common/utils";

export class UpdateAccountDTO {
    @IsString()
    @Trim()
    name: string;
}