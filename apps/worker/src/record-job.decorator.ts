import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Job } from 'bullmq';

export const RecordJob = (span?: string) => {
  return (
    _target: object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    if (!process.env.SENTRY_DSN) {
      return descriptor;
    }

    const method = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const processorName = this.constructor.name || 'Processor';
      const job = args[0] as Job;

      Logger.log(JSON.stringify(job), processorName);
      const transaction = Sentry.startTransaction({
        name: processorName,
        op: span ? span.toLocaleLowerCase() : undefined,
      });

      try {
        const result = await method.apply(this, args);
        transaction.finish();

        return result;
      } catch (err) {
        Logger.error(err, processorName);
        Sentry.captureException(err);
        transaction.finish();
        throw err;
      }
    };

    return descriptor;
  };
};
