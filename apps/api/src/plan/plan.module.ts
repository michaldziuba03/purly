import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './plan.schema';
import { PlanRepository } from './plan.repository';
import { StripeModule } from '../stripe/stripe.module';
import { PlanController } from './plan.controller';

@Module({
  imports: [
    StripeModule,
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
  ],
  providers: [PlanService, PlanRepository],
  controllers: [PlanController],
})
export class PlanModule {}
