import { Transform } from 'class-transformer';

export const Default = (defaultValue: unknown) =>
  Transform(({ value }) => {
    if (value === undefined) {
      return defaultValue;
    }

    if (value === null) {
      return defaultValue;
    }

    return value;
  });
