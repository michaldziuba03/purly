import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subService: SubscriptionService,
    ) {}

    @Post()
    @UseGuards(new AuthGuard())
    subscribe(@Body('priceId') priceId: string, @User('id') userId: string) {
        return this.subService.createSubscriptionSession(priceId, userId);
    }
}
