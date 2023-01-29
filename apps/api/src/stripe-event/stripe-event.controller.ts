import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { StripeEventService } from './stripe-event.service';

@Controller('stripe')
export class StripeEventController {
  constructor(private readonly eventService: StripeEventService) {}

  @Post('webhook')
  async webhookHandler(
    @Req() req: RawBodyRequest<unknown>,
    @Headers('stripe-signature') stripeSignature?: string,
  ) {
    if (!stripeSignature) {
      throw new BadRequestException('Missing webhook signature');
    }

    const event = this.eventService.constructEvent(
      req.rawBody,
      stripeSignature,
    );

    if (!event) {
      throw new BadRequestException('Invalid event data or webhook signature');
    }

    await this.eventService.handleEvent(event);
  }
}
