import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';

@Module({
  controllers: [StatsController],
})
export class StatsModule {}
