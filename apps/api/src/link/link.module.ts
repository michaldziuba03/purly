import { Module } from '@nestjs/common';
import { provideAliasFactory } from './factories/alias.provider';
import { CreateLink } from './usecases/create-link.usecase';
import { UpdateLink } from './usecases/update-link.usecase';
import { DeleteLink } from './usecases/delete-link.usecase';
import { ListLinks } from './usecases/list-links.usecase';
import { RedirectLink } from './usecases/redirect-link.usecase';
import { GetLink } from './usecases/get-link.usecase';

@Module({
  controllers: [],
  providers: [
    CreateLink,
    GetLink,
    UpdateLink,
    DeleteLink,
    ListLinks,
    RedirectLink,
    provideAliasFactory(),
  ],
  exports: [],
})
export class LinkModule {}
