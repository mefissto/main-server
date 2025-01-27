import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'All posts' })
  @Get()
  public async getPosts() {
    return 'Posts';
  }

  @ApiOperation({ summary: 'Get a post' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @Get(':id')
  public async getPost(@Param('id') id: string) {
    return 'Post';
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created' })
  @Post()
  public async createPost(@Body() createPostDto: CreatePostDto) {
    return 'Create Post';
  }

  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated' })
  @Patch()
  public async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return 'Update Post';
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return 'Delete Post';
  }
}
