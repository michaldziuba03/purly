import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AcceptInvite } from './usecases/accept-invite.usecase';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserSession } from '../shared/user.decorator';

@Controller('invites/:inviteToken')
@UseGuards(AuthenticatedGuard)
export class InviteController {
  constructor(private readonly acceptInviteUsecase: AcceptInvite) {}

  @Post()
  async acceptInvite(
    @UserSession('id') userId: string,
    @Param('inviteToken') inviteToken: string
  ) {
    const invite = await this.acceptInviteUsecase.execute({
      userId,
      inviteToken,
    });

    return invite;
  }
}
