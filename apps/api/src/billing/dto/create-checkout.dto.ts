import { IsIn } from 'class-validator';
import { PlansNames } from '../stripe/stripe.constants';
import { Plans } from '@purly/postgres';

export class CreateCheckoutDto {
  @IsIn(PlansNames)
  plan: Plans;
}
