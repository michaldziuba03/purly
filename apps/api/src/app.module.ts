import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigFactory } from '@purly/db';

@Module({
  imports: [MikroOrmModule.forRoot(ConfigFactory.create()), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
