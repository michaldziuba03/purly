import { Module } from '@nestjs/common';
import { BioController } from './bio.controller';
import { CreateBio } from './usecases/create-bio.usecase';
import { UpdateBio } from './usecases/update-bio.usecase';
import { AddButton } from './usecases/add-button.usecase';
import { GetBioPage } from './usecases/get-bio.usecase';

@Module({
  controllers: [BioController],
  providers: [CreateBio, UpdateBio, GetBioPage, AddButton],
})
export class BioModule {}
