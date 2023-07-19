import { IsIn } from 'class-validator';
import { Plans, PlansNames } from '../stripe/stripe.constants';

export class CreateCheckoutDto {
  @IsIn(PlansNames)
  plan: Plans;
}
