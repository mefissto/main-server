import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Server API')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();
