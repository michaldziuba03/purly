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

    get redisUri() {
        return this.configService.get<string>('REDIS_URI');
    }

    get mongoUri() {
        return this.configService.get<string>('MONGO_URI');
    }
}