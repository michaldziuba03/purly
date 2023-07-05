import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberRepository } from '@purly/postgres';
import { isUUID } from 'class-validator';
import { isBefore } from 'date-fns';
import type { Request } from 'express';
import { MEMBER_ROLE } from './allowed-role.decorator';

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

const methodsWithBody: string[] = [
  HttpMethods.POST,
  HttpMethods.PUT,
  HttpMethods.PATCH,
];

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly memberRepository: MemberRepository
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    if (!req) {
      return false;
    }

    const workspaceId = this.getWorkspaceId(req);
    if (!workspaceId) {
      throw new BadRequestException('Workspace identifier is required');
    }

    if (typeof workspaceId !== 'string') {
      throw new BadRequestException('Workspace identifier must be a string');
    }

    if (!isUUID(workspaceId)) {
      throw new BadRequestException('Workspace identifier must be UUID format');
    }

    const user = req.user as { id: string };
    if (!user) {
      // safe guard if someone forgot add to auth guard before membership guard
      throw new UnauthorizedException('You must be authenticated');
    }

    const member = await this.memberRepository.findMember(user.id, workspaceId);

    if (!member) {
      throw new UnauthorizedException(
        'You have no permission to access this workspace'
      );
    }

    const allowedRole = this.reflector.get(MEMBER_ROLE, ctx.getHandler());
    if (allowedRole && allowedRole < member.permission) {
      throw new UnauthorizedException(
        'You have no permission to perform this action'
      );
    }

    if (member.bannedUntil && isBefore(new Date(), member.bannedUntil)) {
      throw new UnauthorizedException('You have been banned in this workspace');
    }

    req.member = member;

    return true;
  }

  private getWorkspaceId(req: Request): unknown {
    if (req.params.workspaceId) {
      return req.params.workspaceId;
    }

    if (req.method === HttpMethods.GET) {
      return req.query.workspaceId;
    }

    if (methodsWithBody.includes(req.method)) {
      return req.body.workspaceId;
    }

    return;
  }
}
