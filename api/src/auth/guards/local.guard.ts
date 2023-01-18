import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);

    return true;
  }
}
