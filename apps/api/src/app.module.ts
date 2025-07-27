import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigFactory } from '@purly/db';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    MikroOrmModule.forRoot(ConfigFactory.create()),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
