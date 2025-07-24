import { PipeTransform, BadRequestException } from '@nestjs/common';
import type { ZodSchema } from 'zod';

export class ValidatorPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const { error, data } = this.schema.safeParse(value);

    if (error) {
      const errors = error.issues.map(
        (issue) => `${issue.path[0].toString()} - ${issue.code}`,
      );
      const output = {
        message: 'Validation failed',
        errors: Array.from(errors),
      };
      throw new BadRequestException(output);
    }

    return data;
  }
}

export function zd(schema: ZodSchema): ValidatorPipe {
  return new ValidatorPipe(schema);
}
