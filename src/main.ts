import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

import { CORS_CONFIG } from '@configs/cors.config';
import { SWAGGER_CONFIG } from '@configs/swagger';
import {
  APP_GLOBAL_PREFIX,
  SWAGGER_DOCS_PATH,
} from '@constants/common.constants';
import { AppConfig } from '@constants/env-variables.constants';

import { AppModule } from './app.module';

/**
 * The main application bootstrap function.
 */
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
      transformOptions: {
        enableImplicitConversion: true, // convert query params to the correct type
      },
      // TODO: add custom validation error messages (exceptionFactory)
    }),
  );

  app.enableCors(CORS_CONFIG);

  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, documentFactory);

  /**
   * Global Interceptors
   */
  // app.useGlobalInterceptors(
  // new CustomInterceptor(),
  // );

  // Setup AWS SDK config
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get(
        `${AppConfig.NAME}.${AppConfig.AWS_ACCESS_KEY_ID}`,
      ),
      secretAccessKey: configService.get(
        `${AppConfig.NAME}.${AppConfig.AWS_SECRET_ACCESS_KEY}`,
      ),
    },
    region: configService.get(`${AppConfig.NAME}.${AppConfig.AWS_REGION}`),
  });

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
