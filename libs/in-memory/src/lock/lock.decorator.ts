import { Logger } from '@nestjs/common';
import { LockService } from './lock.service';

export interface ILockOptions {
  retries?: number;
  letExpire?: boolean;
}

type LockDecorator = (
  resourceName: string,
  TTL: number,
  options: ILockOptions
) => MethodDecorator;

export const Lock: LockDecorator =
  (resourceName: string, TTL: number, options: ILockOptions = {}) =>
  (_target: object, _key: string | symbol, descriptor: PropertyDescriptor) => {
    // get decorated method:
    const method = descriptor.value;
    let lockService: LockService;
    function findLockService(that: object) {
      // iterate over object keys with for..in:
      for (const key in that) {
        if (that[key] instanceof LockService) {
          lockService = that[key];
          break;
        }
      }

      if (!lockService) {
        throw new Error(`Inject LockService from @purly/in-memory`);
      }
    }

    // overwrite original method:
    descriptor.value = async function (...args: unknown[]) {
      findLockService(this);
      let result: unknown;
      Logger.log(`Acquiring lock for ${resourceName}...`);
      const lock = await lockService.create(resourceName, TTL, options.retries);
      if (!lock) {
        return undefined;
      }

      try {
        result = await method.apply(this, args);
      } finally {
        // if letExpire = true, don't release lock, just let it expire (useful for CRON jobs)
        if (!options.letExpire) {
          Logger.log(`Releasing lock for ${resourceName}...`);
          await lockService.release(lock);
        }
      }

      return result;
    };

    return descriptor;
  };
