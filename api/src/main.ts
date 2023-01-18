import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import { validatorOptions } from './common/options';
import { injectRedisToken } from '@mich4l/nestjs-redis';
// EXPRESS.JS MIDDLEWARES IMPORTS:
import helmet from 'helmet';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // essential for stripe webhook
  });
  const config = app.get<Config>(Config);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      ...validatorOptions,
    }),
  );

  if (config.apiPrefix) {
    app.setGlobalPrefix(config.apiPrefix);
  }

  if (config.isDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Docs')
      .setDescription('API specification for URL Shortener')
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/spec', app, swaggerDoc);
  }

  // Redis configuration for session storage:
  const RedisStore = connectRedis(session);
  const redisClient = app.get(injectRedisToken());
  // Middlewares:
  app.use(helmet());
  app.use(
    session({
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: config.sessionSecret,
      cookie: {
        httpOnly: true,
        sameSite: true,
      },
      store: new RedisStore({ client: redisClient }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(config.port);
}

bootstrap();
