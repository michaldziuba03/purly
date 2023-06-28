import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MemberRepository } from '@purly/postgres';
import { isBefore } from 'date-fns';
import type { Request } from 'express';

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
  constructor(private readonly memberRepository: MemberRepository) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    if (!req) {
      return false;
    }

    const workspaceId = this.getWorkspaceId(req);
    if (!workspaceId) {
      throw new BadRequestException('Workspace identifier is required');
    }

    const user = req.user as { id: string };

    const member = await this.memberRepository.findMember(user.id, workspaceId);

    if (!member) {
      throw new ForbiddenException(
        'You have no permission to access this workspace'
      );
    }

    if (member.bannedUntil && isBefore(new Date(), member.bannedUntil)) {
      throw new ForbiddenException('You have been banned');
    }

    req.member = member;

    return true;
  }

  private getWorkspaceId(req: Request): string | undefined {
    if (req.params.workspaceId) {
      return req.params.workspaceId;
    }

    if (req.method === HttpMethods.GET) {
      return req.query.workspaceId as string;
    }

    if (methodsWithBody.includes(req.method)) {
      return req.body.workspaceId;
    }

    return;
  }
}
