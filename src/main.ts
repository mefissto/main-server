import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_CONFIG } from '@configs/swagger';
import { APP_GLOBAL_PREFIX, SWAGGER_DOCS_PATH } from '@constants/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global Pipes
   * helps to maintain the security of the application by validating the incoming data
   * whitelist: true will remove any additional properties that are not defined in the DTO
   * forbidNonWhitelisted: true will throw an error if there are any additional properties that are not defined in the DTO
   * transform: true will automatically transform the incoming data to the correct DTO type
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, documentFactory);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
