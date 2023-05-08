import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountRepository, TransactionSession } from '@libs/data';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { StripeEventHandler, StripeEvents } from '../stripe/stripe.utils';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  getAccount(userId: string) {
    return this.accountRepository.findById(userId);
  }

  updateAccount(userId: string, data: UpdateAccountDTO) {
    return this.accountRepository.findByIdAndUpdate(userId, data);
  }

  @StripeEventHandler(StripeEvents.UpdateSubscription)
  async updateSubscribedPlan(payload, trx: TransactionSession) {
    // stripe should resend the event on error:
    throw new BadRequestException('Not implemented yet!');
  }
}
