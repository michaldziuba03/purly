import { Module } from '@nestjs/common';
import { MappingService } from './mappings.service';
import { MappingsController } from './mappings.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [MappingService],
  controllers: [MappingsController]
})
export class MappingsModule {}
