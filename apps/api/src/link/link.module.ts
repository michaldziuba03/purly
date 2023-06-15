import { Module } from '@nestjs/common';
import { CreateLink } from './usecases/create-link.usecase';
import { DeleteLink } from './usecases/delete-link.usecase';
import { UpdateLink } from './usecases/update-link.usecase';
import { GetLink } from './usecases/get-link.usecase';
import { LinkController } from './link.controller';
import { provideAliasFactory } from './factories/alias-factory.provider';
import { GetLinksList } from './usecases/get-links-list.usecase';

@Module({
  controllers: [LinkController],
  providers: [
    GetLink,
    GetLinksList,
    CreateLink,
    DeleteLink,
    UpdateLink,
    provideAliasFactory(),
  ],
})
export class LinkModule {}
