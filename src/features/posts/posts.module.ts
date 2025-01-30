import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsModule } from '@features/tags/tags.module';
import { UsersModule } from '@features/users/users.module';

import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, TagsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
