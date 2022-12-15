import { Module } from '@nestjs/common';
import { AliasModule } from './alias/alias.module';
import { RangeModule } from './range/range.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shortener'),
    RangeModule,
    AliasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
