import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from '@purly/postgres';

export const Membership = createParamDecorator(
  (field: keyof Member | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const member = req.member;

    if (!member) {
      return;
    }

    return field ? member[field] : member;
  }
);
