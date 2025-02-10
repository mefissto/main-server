import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ActiveUser } from '@decorators/active-user.decorator';
import { ActiveUserData } from '@interfaces/active-user-data.interface';

import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

/**
 * The posts controller.
 */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Get all posts.
   * @returns All posts
   */
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'All posts' })
  @Get('/:userId')
  public async getPosts(
    @Param('userId') userId: string,
    @Query() query: GetPostsDto,
  ) {
    return this.postsService.getPosts(userId, query);
  }

  /**
   * Get a post.
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Get a post' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @Get(':id')
  public async getPost(@Param('id') id: string) {
    return 'Post';
  }

  /**
   * Create a new post.
   * @param createPostDto
   * @returns
   */
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created' })
  @Post()
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.createPost(createPostDto, user);
  }

  /**
   * Update a post.
   * @param updatePostDto
   * @returns
   */
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated' })
  @Patch()
  public async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(updatePostDto);
  }

  /**
   * Delete a post.
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
