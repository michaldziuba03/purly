import { Transform } from 'class-transformer';

export const HexColor = () =>
  Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    if (value.startsWith('#')) {
      return value;
    }

    return `#${value}`;
  });
