import { INestApplication } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import RedisStore from 'connect-redis';
import { injectRedisToken } from '@mich4l/nestjs-redis';

export function setupSession(app: INestApplication) {
  const redisClient = app.get(injectRedisToken());

  app.use(
    session({
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
      store: new RedisStore({
        client: redisClient,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
