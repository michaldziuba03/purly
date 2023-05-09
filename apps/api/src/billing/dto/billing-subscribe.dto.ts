import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../../shared/utils';

export class BillingSubscribeDto {
  @IsString()
  @Trim()
  @IsNotEmpty()
  priceId: string;
}
