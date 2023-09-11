import { Controller, Get, Param } from '@nestjs/common';
import { GetLaunchpadBySlug } from './usecases/get-launchpad-by-slug.usecase';

@Controller('launchpads')
export class PublicLaunchpadController {
  constructor(private readonly getLaunchpadBySlugUsecase: GetLaunchpadBySlug) {}

  @Get(':slug')
  getBioPage(@Param('slug') slug: string) {
    return this.getLaunchpadBySlugUsecase.execute({
      slug,
    });
  }
}
