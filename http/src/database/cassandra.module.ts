import { DynamicModule, Global, Logger, Module, Provider } from "@nestjs/common";
import { DseClientOptions, Client } from 'cassandra-driver';

export const CASSANDRA_CLIENT = 'CASSANDRA_CLIENT';

function createProvider(client: Client): Provider {
        return {
            provide: CASSANDRA_CLIENT,
            useValue: client,
        }
}

@Global()
@Module({})
export class CassandraModule {
    static register(options: DseClientOptions): DynamicModule {
        const client = new Client(options);
        client
        .connect()
        .then(() => {
            Logger.log('Cassandra connected successfuly', 'CassandraModule');
        })
        
        const providers = [createProvider(client)];

        return {
            module: CassandraModule,
            providers,
            exports: providers,
        }
    }
}
