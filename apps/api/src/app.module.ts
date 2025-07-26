import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigFactory } from '@purly/db';

@Module({
  imports: [MikroOrmModule.forRoot(ConfigFactory.create()), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
