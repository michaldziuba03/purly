import { Module } from '@nestjs/common';
import { PostgresModule } from '@purly/postgres';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostgresModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
