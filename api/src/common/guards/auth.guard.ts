
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,){
    const request = context.switchToHttp().getRequest();
    return Boolean(request.session.get('user'));
  }
}