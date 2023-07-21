import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRepository } from '@purly/database';

// TODO: implement redlock for CRON jobs
@Injectable()
export class CronService {
  constructor(private readonly userRepository: UserRepository) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async clearStaleToken() {
    console.log('Clear stale tokens...');
    await this.userRepository.deleteExpiredTokens();
  }
}
