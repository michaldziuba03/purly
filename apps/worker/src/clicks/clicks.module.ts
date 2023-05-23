import { Module } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { ClicksProcessor } from './clicks.processor';
import { BullModule } from '@nestjs/bullmq';
import { CLICK_QUEUE } from '@libs/jobs';
import { StatsRepository } from '@libs/data';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CLICK_QUEUE,
    }),
  ],
  providers: [ClicksService, ClicksProcessor, StatsRepository],
})
export class ClicksModule {}
