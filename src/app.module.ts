import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import appConfig from '@configs/app.config';
import databaseConfig from '@configs/database.config';
import environmentValidation from '@configs/environment.validation';
import jwtConfig from '@configs/jwt.config';
import { DatabaseModule } from '@database/database.module';

import { AuthModule } from '@features/auth/auth.module';
import { MetaOptionsModule } from '@features/meta-options/meta-options.module';
import { PostsModule } from '@features/posts/posts.module';
import { TagsModule } from '@features/tags/tags.module';
import { UsersModule } from '@features/users/users.module';

import { AccessTokenGuard } from '@core/guards/access-token.guard';
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
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: environmentValidation,
    }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    DatabaseModule,
    UsersModule,
    PostsModule,
    TagsModule,
    AuthModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
