import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }) => {
    if (value && value.trim) {
      return value.trim();
    }

    return value;
  });
