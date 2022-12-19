import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from "./config.schema";

@Injectable()
export class Config {
    constructor(
        private configService: ConfigService,
    ) {}

    get env() {
        return this.configService.get<NodeEnv>('NODE_ENV');
    }

    get port() {
        return this.configService.get<number>('PORT');
    }

    get zkConnect() {
        return this.configService.get<string>('ZK_CONNECT');
    }

    get mongoURI() {
        return this.configService.get<string>('MONGO_URI');
    }

    get sessionKey() {
        return this.configService.get<string>('SESSION_KEY');
    }

    get frontendUrl() {
        return this.configService.get<string>('FRONTEND_URL');
    }

    get stripeKey() {
        return this.configService.get<string>('STRIPE_SECRET_KEY');
    }

    get stripeHookSecret() {
        return this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    }

    get stripeSuccessUrl() {
        return this.frontendUrl;
    }

    get stripeCancelUrl() {
        return new URL('/cancel', this.frontendUrl).href;
    }

    get basicPlanId() {
        return this.configService.get<string>('BASIC_PLAN_ID');
    }

    get proPlanId() {
        return this.configService.get<string>('PRO_PLAN_ID');
    }
}