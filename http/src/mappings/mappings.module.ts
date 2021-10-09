import { Module } from '@nestjs/common';
import { MappingService } from './mappings.service';
import { MappingsController } from './mappings.controller';
import { TokenModule } from 'src/token/token.module';
import { CounterModule } from 'src/counter/counter.module';

@Module({
  imports: [TokenModule, CounterModule],
  providers: [MappingService],
  controllers: [MappingsController]
})
export class MappingsModule {}
