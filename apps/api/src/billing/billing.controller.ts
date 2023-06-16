import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  AuthenticatedGuard,
  OptionalAuth,
} from '../auth/guards/authenticated.guard';
import { PLANS } from './stripe/stripe.constants';
import { CreateCheckout } from './usecases/create-checkout.usecase';
import { ManageSubscriptions } from './usecases/manage-subscriptions.usecase';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UserSession } from '../shared/user.decorator';

@Controller('billing')
@UseGuards(AuthenticatedGuard)
export class BillingController {
  constructor(
    private readonly createCheckoutUsecase: CreateCheckout,
    private readonly manageSubscriptionsUsecase: ManageSubscriptions
  ) {}

  @Post('checkout')
  async createCheckout(
    @UserSession('id') userId: string,
    @Body() body: CreateCheckoutDto
  ) {
    const url = await this.createCheckoutUsecase.execute({
      userId,
      priceId: body.priceId,
    });

    return { url };
  }

  @Get('manage')
  async manageSubscriptions(@UserSession('id') userId: string) {
    const url = await this.manageSubscriptionsUsecase.execute({
      userId,
    });

    return { url };
  }

  @Get('plans')
  @OptionalAuth()
  getPlans() {
    return PLANS;
  }
}
