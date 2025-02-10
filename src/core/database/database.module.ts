import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfig } from '@constants/env-variables.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.DATABASE_HOST}`,
        ),
        port: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.DATABASE_PORT}`,
        ),
        username: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.DATABASE_USERNAME}`,
        ),
        password: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.DATABASE_PASSWORD}`,
        ),
        database: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.DATABASE_NAME}`,
        ),
        synchronize: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.SYNCHRONIZE}`,
        ), // Be cautious about using synchronize in production
        autoLoadEntities: configService.get(
          `${DatabaseConfig.NAME}.${DatabaseConfig.AUTOLOAD_ENTITIES}`,
        ),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
