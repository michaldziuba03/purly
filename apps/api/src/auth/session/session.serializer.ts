import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: { id: string }, done: CallableFunction) {
    done(null, user.id);
  }

  deserializeUser(userId: string, done: CallableFunction) {
    done(null, { id: userId });
  }
}
