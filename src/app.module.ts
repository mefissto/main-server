import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_DEV_FILE_PATH } from '@constants/common';
import { DatabaseModule } from '@database/database.module';

import { MetaOptionsModule } from '@features/meta-options/meta-options.module';
import { PostsModule } from '@features/posts/posts.module';
import { TagsModule } from '@features/tags/tags.module';
import { UsersModule } from '@features/users/users.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_DEV_FILE_PATH }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
