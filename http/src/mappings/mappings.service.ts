import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { CASSANDRA_CLIENT } from '../database/cassandra.module';

interface IMapping {
    token: string;
    url: string;
}

@Injectable()
export class MappingService {
    constructor(
        @Inject(CASSANDRA_CLIENT)
        private readonly dbClient: Client,
    ) {}

    async getUrl(token: string) {
        const query = 'SELECT url FROM mappings WHERE short_token = ?'
        const result = await this.dbClient.execute(query, [token]);
        return result.rows[0];
    }

    async createMapping(mapping: IMapping) {
        const query = 'INSERT INTO mappings (short_token, url) VALUES (?, ?)';
        const result = await this.dbClient.execute(query, [mapping.token, mapping.url]);
        return result;
    }
}
