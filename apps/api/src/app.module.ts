import { Module } from '@nestjs/common';
import { PostgresModule } from '@purly/postgres';

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
