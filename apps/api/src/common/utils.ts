import { ClassConstructor, plainToClass } from 'class-transformer';

export function mapEntity<C>(plain: any, cls: ClassConstructor<C>) {
  if (!plain) {
    return;
  }

  if (plain.toObject && typeof plain.toObject === 'function') {
    const plainObj: object = plain.toObject();
    return plainToClass(cls, plainObj, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  if (typeof plain === 'object') {
    return plainToClass(cls, plain, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}

export function returnPromise(value: any) {
  return new Promise((resolve) => resolve(value));
}
