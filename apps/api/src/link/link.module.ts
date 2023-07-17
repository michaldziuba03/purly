import { Module } from '@nestjs/common';
import { provideAliasFactory } from './factories/alias.provider';

@Module({
  controllers: [],
  providers: [provideAliasFactory()],
  exports: [],
})
export class LinkModule {}
