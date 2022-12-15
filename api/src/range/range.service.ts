import { Injectable } from '@nestjs/common';
import type ZK from 'zookeeper';
const ZK_EPHEMERAL_SEQUENTIAL = 3; // flag for created znode

interface ICounter {
    seq: number; // sequence number
    start: number; // start of range
    curr: number; // current number
    end: number; // end of range
}

@Injectable()
export class RangeService {
    private basePath = '/range';
    private range = 10_000;

    private counter: ICounter;
    private zk: ZK;

    async initRange(zk: ZK) {
        this.zk = zk;
        this.setRange();
    }

    private async setRange() {
        const path = await this.zk.create(this.basePath, '', ZK_EPHEMERAL_SEQUENTIAL);
        
        const seq = this.parseSeq(path);
        const end = seq * this.range;
        const start = end - (this.range - 1);

        this.counter = {
            seq,
            start,
            curr: start,
            end,
        }
    }

    private parseSeq(path: string) {
        return Number(path.replace(this.basePath, '')) + 1;
    }

    async next() {
        if (!this.counter) {
            throw new Error('Range is not initialized yet');
        }

        if (this.counter.curr === this.counter.end) {
            await this.setRange();
        }

        const nextNum = this.counter.curr;
        this.counter.curr++;

        return nextNum;
    }
}
