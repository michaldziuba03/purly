import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
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
}
