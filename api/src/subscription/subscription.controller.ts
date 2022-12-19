import { BadRequestException, Body, Controller, Headers, Post, RawBodyRequest, Req, UseGuards, } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Config } from 'src/config/config';
import Stripe from 'stripe';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subService: SubscriptionService,
        private readonly config: Config,
    ) {}

    @Post()
    @UseGuards(new AuthGuard())
    subscribe(@Body('priceId') priceId: string, @User('id') userId: string) {
        return this.subService.createSubscriptionSession(priceId, userId);
    }

    @Post('webhook')
    webhook(
        @Req() req: RawBodyRequest<unknown>,
        @Headers('stripe-signature') stripeSignature: string, 
    ) {
        let event: Stripe.Event | Buffer = req.rawBody;
        try {
            event = this.subService.constructEvent(
                req.rawBody, 
                stripeSignature, 
                this.config.stripeHookSecret
            );
        } catch (err) {
            console.error(err);
            throw new BadRequestException('Invalid webhook event');
        }

        switch (event.type) {
            case 'customer.subscription.created':
                console.log('Subscription created');
                break
            default:
                break
        }

        return; // just send back STATUS 200 OK
    }
}
