import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '@configs/app.config';
import databaseConfig from '@configs/database.config';
import environmentValidation from '@configs/environment.validation';
import { DatabaseModule } from '@database/database.module';

import { MetaOptionsModule } from '@features/meta-options/meta-options.module';
import { PostsModule } from '@features/posts/posts.module';
import { TagsModule } from '@features/tags/tags.module';
import { UsersModule } from '@features/users/users.module';

import { AppController } from './app.controller';

// Load the environment file based on the NODE_ENV environment variable
const envFilePath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV.trim()}`
  : '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
