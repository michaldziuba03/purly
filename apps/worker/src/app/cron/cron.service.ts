import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRepository } from '@purly/database';
import { Lock, LockService } from '@purly/in-memory';

export enum Durations {
  FIVE_MINUTES = 5 * 60 * 1000,
}

@Injectable()
export class CronService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly lockService: LockService // required by @Lock decorator
  ) {}

  // TODO: add option to customize cron expression from env variable
  @Cron(CronExpression.EVERY_5_MINUTES)
  @Lock('CRON_CLEAR_TOKENS', Durations.FIVE_MINUTES, {
    letExpire: true, // don't release lock, wait for expiration
    retries: 0, // no sense to retry scheduled for every 5 minutes task
  })
  async clearStaleToken() {
    Logger.log('Deleting stale reset tokens...');
    await this.userRepository.deleteExpiredTokens();
  }
}
