import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { validatorOptions } from './options';

export async function transformAndValidate<T extends object>(
  cls: ClassConstructor<T>,
  plain: object,
  customErr?: any,
) {
  const instance = plainToClass(cls, plain);
  try {
    await validateOrReject(instance, validatorOptions);

    return instance;
  } catch (err) {
    if (customErr) {
      throw customErr;
    }

    throw err;
  }
}

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
