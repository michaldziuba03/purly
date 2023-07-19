import { Transform } from 'class-transformer';
import { isDateString } from 'class-validator';

export const ToDate = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      if (isDateString(value)) {
        return new Date(value);
      }
    }

    if (typeof value === 'number') {
      return new Date(value);
    }

    return value;
  });
