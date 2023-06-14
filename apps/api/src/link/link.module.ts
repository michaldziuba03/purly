import { Module } from '@nestjs/common';
import { CreateLink } from './usecases/create-link.usecase';
import { DeleteLink } from './usecases/delete-link.usecase';
import { UpdateLink } from './usecases/update-link.usecase';
import { GetLink } from './usecases/get-link.usecase';
import { LinkController } from './link.controller';
import { provideAliasFactory } from './factories/alias-factory.provider';

@Module({
  controllers: [LinkController],
  providers: [
    GetLink,
    CreateLink,
    DeleteLink,
    UpdateLink,
    provideAliasFactory(),
  ],
})
export class LinkModule {}
