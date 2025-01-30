import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
} from '@constants/env-variables';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(DATABASE_HOST),
        port: configService.get(DATABASE_PORT),
        username: configService.get(DATABASE_USERNAME),
        password: configService.get(DATABASE_PASSWORD),
        database: configService.get(DATABASE_NAME),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true, // Be cautious about using synchronize in production
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
