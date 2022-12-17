import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
    constructor(
        private configService: ConfigService,
    ) {}

    get port() {
        return this.configService.get<number>('PORT');
    }

    get zkConnect() {
        return this.configService.get<string>('ZK_CONNECT');
    }

    get mongoURI() {
        return this.configService.get<string>('MONGO_URI');
    }
}