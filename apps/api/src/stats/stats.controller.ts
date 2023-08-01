import {
  ClassSerializerInterceptor,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetTopBrowsers } from './usecases/get-top-browsers.usecase';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { BaseController } from '../shared/base.controller';
import { Membership } from '../workspace/framework/membership.decorator';
import { Member } from '@purly/database';
import { GetTopOS } from './usecases/get-top-os.usecase';
import { StatsQueryDto } from './dto/stats-query.dto';
import { GetTopCountries } from './usecases/get-top-countries.usecase';
import { GetTopReferers } from './usecases/get-top-referers.usecase';

@BaseController('stats')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class StatsController {
  constructor(
    private readonly getTopBrowsersUsecase: GetTopBrowsers,
    private readonly getTopOSUsecase: GetTopOS,
    private readonly getTopReferersUsecase: GetTopReferers,
    private readonly getTopCountriesUsecase: GetTopCountries
  ) {}

  // TODO: add check if link exists by linkId and workspaceId in database
  @Get('browsers')
  topBrowsers(@Membership() member: Member, @Query() query: StatsQueryDto) {
    return this.getTopBrowsersUsecase.execute({ linkId: query.linkId });
  }

  @Get('os')
  topOS(@Query() query: StatsQueryDto) {
    return this.getTopOSUsecase.execute({ linkId: query.linkId });
  }

  @Get('referers')
  topReferers(@Query() query: StatsQueryDto) {
    return this.getTopReferersUsecase.execute({ linkId: query.linkId });
  }

  @Get('countries')
  getTopCountries(@Query() query: StatsQueryDto) {
    return this.getTopCountriesUsecase.execute({ linkId: query.linkId });
  }
}
