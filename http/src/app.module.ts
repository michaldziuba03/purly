import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { CounterModule } from './counter/counter.module';
import { CassandraModule } from './database/cassandra.module';
import { MappingsModule } from './mappings/mappings.module';

@Module({
  imports: [
    TokenModule, 
    CounterModule,
    CassandraModule.register({
      keyspace: 'shorturl_keyspace',
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
    }),
    MappingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
