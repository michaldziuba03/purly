import { Injectable } from '@nestjs/common';
import { StatsRepository } from '@libs/data';

@Injectable()
export class ClicksService {
  constructor(private readonly statsRepository: StatsRepository) {}

  async recordClick(alias: string) {
    // TODO: parse user-agent, referer and get ip location
    await this.statsRepository.recordClick({
      browser: 'chrome',
      country: 'PL',
      alias,
      referer: 'google.com',
      timestamp: '2023-05-23',
      os: 'windows',
    });
  }
}
