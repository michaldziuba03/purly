import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserSession = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      return;
    }

    return field ? user[field] : user;
  },
);
