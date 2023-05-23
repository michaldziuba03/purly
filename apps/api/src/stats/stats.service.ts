import { Injectable } from '@nestjs/common';
import { StatsRepository } from '@libs/data';

@Injectable()
export class StatsService {
  constructor(private readonly statsRepository: StatsRepository) {}

  getClicks(alias: string) {
    return this.statsRepository.getClicks(alias);
  }
}
