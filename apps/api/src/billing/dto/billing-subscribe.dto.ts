import { IsIn } from 'class-validator';
import { PRICES } from '../../stripe/stripe.constants';

export class BillingSubscribeDto {
  @IsIn(PRICES, {
    message: 'Invalid price id',
  })
  priceId: string;
}
