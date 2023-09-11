import { Module } from '@nestjs/common';
import { LaunchpadController } from './launchpad.controller';
import { CreateLaunchpad } from './usecases/create-launchpad.usecase';
import { GetLaunchpad } from './usecases/get-launchpad.usecase';
import { AddElement } from './usecases/add-element.usecase';
import { LinkModule } from '../link/link.module';
import { DeleteElement } from './usecases/delete-element.usecase';
import { GetLaunchpadBySlug } from './usecases/get-launchpad-by-slug.usecase';
import { PublicLaunchpadController } from './public.launchpad.controller';

@Module({
  imports: [LinkModule],
  controllers: [LaunchpadController, PublicLaunchpadController],
  providers: [
    CreateLaunchpad,
    GetLaunchpad,
    GetLaunchpadBySlug,
    AddElement,
    DeleteElement,
  ],
})
export class LaunchpadModule {}
