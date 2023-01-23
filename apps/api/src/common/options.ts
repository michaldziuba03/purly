import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
  whitelist: true,
  stopAtFirstError: true,
};
