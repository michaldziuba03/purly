import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberRole } from '@purly/shared';
import { MemberRepository } from '@purly/database';
import { isUUID } from 'class-validator';
import { MEMBER_ROLE } from './allowed-role.decorator';
import { SKIP_MEMBERSHIP } from './skip-membership.decorator';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly memberRepository: MemberRepository
  ) {}

  async canActivate(ctx: ExecutionContext) {
    // often it's better to define guard on controller level and just exclude few endpoints
    const canSkip = this.reflector.get(SKIP_MEMBERSHIP, ctx.getHandler());
    if (canSkip) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    // safe guard if someone will try to use this guard outside http context
    if (!req) {
      return false;
    }

    const workspaceId = req.params.workspaceId;
    if (!workspaceId) {
      throw new BadRequestException('Workspace identifier is required');
    }

    if (typeof workspaceId !== 'string') {
      throw new BadRequestException('Workspace identifier must be a string');
    }

    if (!isUUID(workspaceId, '4')) {
      throw new BadRequestException(
        'Workspace identifier must be valid UUID v4 format'
      );
    }

    const user = req.user as { id: string };
    if (!user) {
      // safe guard if someone forgot to add auth guard before membership guard
      throw new UnauthorizedException('You must be authenticated');
    }

    const member = await this.memberRepository.findMember(workspaceId, user.id);

    if (!member) {
      throw new UnauthorizedException(
        'You have no permission to access this workspace'
      );
    }

    const allowedRole =
      this.reflector.get(MEMBER_ROLE, ctx.getHandler()) || MemberRole.MEMBER;
    if (allowedRole < member.role) {
      throw new UnauthorizedException(
        'You have no permission to perform this action'
      );
    }

    req.member = member;

    return true;
  }
}
