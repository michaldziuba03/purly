import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserSession } from '../shared/decorators/user.decorator';
import { BillingSubscribeDto } from './dto/billing-subscribe.dto';

@Controller('billing')
@UseGuards(AuthenticatedGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('subscribe')
  async subscribe(
    @UserSession('id') userId: string,
    @Body() body: BillingSubscribeDto,
  ) {
    const session = await this.billingService.subscribe(body.priceId, userId);

    return { url: session.url };
  }

  @Get('manage')
  async manage(@UserSession('id') userId: string) {
    const session = await this.billingService.manage(userId);

    return { url: session.url };
  }
}
