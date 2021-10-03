import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { AnySchema } from "joi";

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(
        private readonly schema: AnySchema,
    ) {}

    transform(input: any) {
        const { value, error } = this.schema.validate(input);
        if (error) {
            throw new BadRequestException(error.message);
        }

        return value;
    }
}
