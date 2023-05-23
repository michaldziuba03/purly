import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(':alias')
  getStats(@Param('alias') alias: string) {
    return this.statsService.getClicks(alias);
  }
}
