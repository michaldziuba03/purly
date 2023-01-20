import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API specification for URL Shortener')
    .setLicense(
      'MIT',
      'https://github.com/michaldziuba03/url-shortener/blob/main/LICENSE',
    )
    .setContact(
      'Michał Dziuba',
      'https://michaldziuba.dev',
      'mail@michaldziuba.dev',
    )
    .setExternalDoc('GitHub', 'https://github.com/michaldziuba03/url-shortener')
    .build();

  const path = 'api/spec';
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(path, app, swaggerDoc);

  // Serve specification in json (useful for tools like Insomnia)
  app.getHttpAdapter().get(`/${path}/json`, (_, res) => {
    res.json(swaggerDoc);
  });
}
