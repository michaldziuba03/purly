import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateCheckout } from './usecases/create-checkout.usecase';
import { ManageSubscriptions } from './usecases/manage-subscriptions.usecase';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UserSession } from '../shared/user.decorator';
import { StripeEvents } from './stripe/stripe.webhook';
import { OnStripeEvent } from './stripe/stripe.event';
import Stripe from 'stripe';
import { getNameByPriceId } from './stripe/stripe.constants';
import { UpdateSubscription } from './usecases/update-subscription.usecase';
import { Plans } from '@purly/postgres';

@Controller('billing')
@UseGuards(AuthenticatedGuard)
export class BillingController {
  constructor(
    private readonly createCheckoutUsecase: CreateCheckout,
    private readonly manageSubscriptionsUsecase: ManageSubscriptions,
    private readonly updateSubscriptionUsecase: UpdateSubscription
  ) {}

  @Post('checkout')
  async createCheckout(
    @UserSession('id') userId: string,
    @Body() body: CreateCheckoutDto
  ) {
    const url = await this.createCheckoutUsecase.execute({
      userId,
      plan: body.plan,
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

  @OnStripeEvent(StripeEvents.UpdateSubscription)
  async updateSubscription(payload: Stripe.Subscription) {
    await this.updateSubscriptionUsecase.execute({
      billigId: payload.customer.toString(),
      plan: this.getPlanForSubscription(payload),
    });
  }

  @OnStripeEvent(StripeEvents.DeleteSubscription)
  async deleteSubscription(payload: Stripe.Subscription) {
    await this.updateSubscriptionUsecase.execute({
      billigId: payload.customer.toString(),
      plan: Plans.FREE,
    });
  }

  private getPlanForSubscription(payload: Stripe.Subscription) {
    const priceId = payload.items.data[0].price.id;
    if (!priceId) {
      // log and report case like this.
      throw new BadRequestException('Price ID is required');
    }

    const foundPriceId = getNameByPriceId(priceId);
    if (!foundPriceId) {
      throw new BadRequestException('Price ID is invalid');
    }

    return foundPriceId;
  }
}
