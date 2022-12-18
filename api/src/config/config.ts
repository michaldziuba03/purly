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
}