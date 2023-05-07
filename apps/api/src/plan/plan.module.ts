import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';

@Module({
  providers: [PlanService],
})
export class PlanModule {}
