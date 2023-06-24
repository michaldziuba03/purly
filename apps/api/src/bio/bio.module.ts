import { Module } from '@nestjs/common';
import { BioController } from './bio.controller';
import { CreateBio } from './usecases/create-bio.usecase';
import { UpdateBio } from './usecases/update-bio.usecase';
import { AddButton } from './usecases/add-button.usecase';
import { GetBioPage } from './usecases/get-bio.usecase';
import { LinkModule } from '../link/link.module';
import { GetMyBioPage } from './usecases/get-my-bio.usecase';
import { DeleteBio } from './usecases/delete-bio.usecase';
import { DeleteButton } from './usecases/delete-button.usecase';

@Module({
  imports: [LinkModule],
  controllers: [BioController],
  providers: [
    CreateBio,
    UpdateBio,
    GetBioPage,
    GetMyBioPage,
    DeleteBio,
    AddButton,
    DeleteButton,
  ],
})
export class BioModule {}
