import { Controller, Get } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  allPlans() {
    return this.planService.getPlans();
  }
}
