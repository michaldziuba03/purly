import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(userId: string, done: CallableFunction) {
    done(null, userId);
  }

  deserializeUser(userId: string, done: CallableFunction) {
    done(null, { id: userId });
  }
}
