import { BadRequestException, Body, Controller, Get, Headers, Post, RawBodyRequest, Req, UseGuards, } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Config } from 'src/config/config';
import Stripe from 'stripe';
import { SubscriptionEvents } from './subscription.constants';
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

    private readonly updateSubscriptionTriggers: string[] = [
        SubscriptionEvents.CREATED,
        SubscriptionEvents.UPDATED,
    ]

    @Post('webhook')
    async stripeWebhook(
        @Req() req: RawBodyRequest<unknown>,
        @Headers('stripe-signature') stripeSignature: string, 
    ) {
        if (!stripeSignature) {
            throw new BadRequestException('Missing signature');
        }

        const event = this.subService.constructEvent(
            req.rawBody, 
            stripeSignature, 
            this.config.stripeHookSecret
        );

        if (!event) {
            throw new BadRequestException('Invalid event data');
        }
        /* 
        We want to ensure the idempotency of our webhook handler so we are checking if event has already been processed
        
        TO-DO: saving event and updating subscription should be run in transaction (to avoid dangerous data inconsistency in some cases).
        For example: saving event succeed but updating subscription status failed - we end up with data inconsistency
        */
       if (this.updateSubscriptionTriggers.includes(event.type)) {
            const isProcessed = await this.subService.isProcessed(event.id, event.type);
            if (isProcessed) return;

            const subscription = event.data.object as Stripe.Subscription;
            // @ts-ignore:
            await this.subService.saveSubscription(subscription.customer, subscription.plan.product);
        }

        if (event.type === SubscriptionEvents.DELETED) {
            const isProcessed = await this.subService.isProcessed(event.id, event.type);
            if (isProcessed) return;

            const subscription = event.data.object as Stripe.Subscription;
            await this.subService.deleteSubscription(subscription.customer as string);
        }

        return; // just send back STATUS 201 CREATED
    }
}
