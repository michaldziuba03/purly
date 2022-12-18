import { IsUrl } from "class-validator";
import { Trim } from "src/common/utils";

export class CreateAliasDTO {
    @IsUrl()
    @Trim()
    url: string;
}