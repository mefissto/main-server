import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { APP_GLOBAL_PREFIX } from '@constants/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
