import { Module } from '@nestjs/common';
import { CreateBioPage } from './usecases/create-bio-page.usecase';
import { BioController } from './bio.controller';
import { GetBioPage } from './usecases/get-bio-page.usecase';
import { UpdateBioPage } from './usecases/update-bio-page.usecase';
import { LinkModule } from '../link/link.module';
import { AddElement } from './usecases/add-element.usecase';
import { DeleteElement } from './usecases/delete-element.usecase';
import { UpdateElement } from './usecases/update-element.usecase';

@Module({
  imports: [LinkModule],
  providers: [
    CreateBioPage,
    GetBioPage,
    UpdateBioPage,
    AddElement,
    DeleteElement,
    UpdateElement,
  ],
  controllers: [BioController],
})
export class BioModule {}
