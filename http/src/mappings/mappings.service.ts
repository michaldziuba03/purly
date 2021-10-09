import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import * as Long from 'long';
import { CASSANDRA_CLIENT } from '../database/cassandra.module';

interface IMapping {
    token: string;
    url: string;
    counter: number;
}

@Injectable()
export class MappingService {
    constructor(
        @Inject(CASSANDRA_CLIENT)
        private readonly dbClient: Client,
    ) {}

    async getUrl(token: string) {
        const query = 'SELECT url FROM mappings WHERE short_token = ?';
        const result = await this.dbClient.execute(query, [token]);

        return result.rows[0];
    }

    async createMapping(mapping: IMapping) {
        const query = 'INSERT INTO mappings (short_token, url, counter, created_at) VALUES (?, ?, ?, toTimestamp(now()))';
        const result = await this.dbClient.execute(query, [
            mapping.token, 
            mapping.url, 
            Long.fromNumber(mapping.counter)
        ]);

        return result;
    }
}
