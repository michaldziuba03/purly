import { Injectable } from '@nestjs/common';
import * as base62 from 'base62';

@Injectable()
export class TokenService {
    generateToken(counter: number) {
        const token = base62.encode(counter);
        return token;
    }
}
