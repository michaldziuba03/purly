import { IsUrl } from "class-validator";

export class CreateAliasDTO {
    @IsUrl()
    url: string;
}