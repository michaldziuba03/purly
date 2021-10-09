import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
    private counter: number = 2132365;
    
    getValueAndIncrement() {
        const value = this.counter;
        this.counter++;

        return value;
    }
}
