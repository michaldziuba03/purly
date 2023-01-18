import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Account } from '../account/account.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: Account, done: CallableFunction) {
    done(null, user.id);
  }

  deserializeUser(userId: string, done: CallableFunction) {
    done(null, { id: userId });
  }
}