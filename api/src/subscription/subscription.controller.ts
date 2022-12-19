import { BadRequestException, Body, Controller, Get, Headers, Post, RawBodyRequest, Req, UseGuards, } from '@nestjs/common';
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

    @Get()
    @UseGuards(new AuthGuard())
    manageSubscriptions(@User('id') userId: string) {
        return this.subService.manageSubscription(userId);
    }

    @Post('webhook')
    async webhook(
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
            throw new BadRequestException('Invalid webhook event');
        }

        switch (event.type) {
            case 'customer.subscription.created':
                console.log('Subscription created:', event.data, event.object);
                // @ts-ignore:
                await this.subService.createSubscription(event.data.object.customer, event.data.object.plan.product);
                break
            case 'customer.subscription.updated':
                break
            case 'customer.subscription.deleted':
                break
            default:
                break
        }

        return; // just send back STATUS 201 CREATED
    }
}
