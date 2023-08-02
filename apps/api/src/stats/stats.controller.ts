import {
  ClassSerializerInterceptor,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MembershipGuard } from '../workspace/framework/membership.guard';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { BaseController } from '../shared/base.controller';
import { Membership } from '../workspace/framework/membership.decorator';
import { Member } from '@purly/database';
import { AnalyticsService } from '@purly/analytics';
import { StatsQueryDto } from './dto/stats-query.dto';

@BaseController('stats')
@UseGuards(AuthenticatedGuard, MembershipGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class StatsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // TODO: add check if link exists by linkId and workspaceId in database
  @Get('browsers')
  topBrowsers(@Membership() member: Member, @Query() query: StatsQueryDto) {
    return this.analyticsService.getTopBrowsers(query.linkId);
  }

  @Get('os')
  topOS(@Query() query: StatsQueryDto) {
    return this.analyticsService.getTopOS(query.linkId);
  }

  @Get('referers')
  topReferers(@Query() query: StatsQueryDto) {
    return this.analyticsService.getTopReferers(query.linkId);
  }

  @Get('countries')
  getTopCountries(@Query() query: StatsQueryDto) {
    return this.analyticsService.getTopCountries(query.linkId);
  }
}
