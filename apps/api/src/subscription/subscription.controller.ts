import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('subscriptions')
@UseGuards(AuthenticatedGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async manage(@User('id') accountId: string) {
    return await this.subscriptionService.createBillingPortalSession(accountId);
  }

  @Post()
  async subscribe(
    @User('id') accountId: string,
    @Body('priceId') priceId: string,
  ) {
    return await this.subscriptionService.createCheckoutSession(
      accountId,
      priceId,
    );
  }
}
