import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_CONFIG } from '@configs/swagger';
import { APP_GLOBAL_PREFIX, SWAGGER_DOCS_PATH } from '@constants/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, documentFactory);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
