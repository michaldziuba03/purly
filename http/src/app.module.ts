import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TokenModule } from './token/token.module';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [TokenModule, CounterModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
