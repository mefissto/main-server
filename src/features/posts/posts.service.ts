import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '@features/users/users.service';

import { TagsService } from '@features/tags/tags.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';

/**
 * The posts service.
 */
@Injectable()
export class PostsService {
  /**
   * The constructor.
   * @param postRepository The post repository.
   */
  constructor(
    // Inject the post repository
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    // Inject the users service
    private readonly userService: UsersService,

    private readonly tagsService: TagsService,
  ) {}

  /**
   * Create a post.
   * @param post The post data.
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    // Find the author by id
    const author = await this.userService.findOneByIdOrFail(
      createPostDto.authorId,
    );
    // Find the tags by ids
    const tags = await this.tagsService.findMultipleByIds(createPostDto.tags);

    const post = this.postRepository.create({ ...createPostDto, author, tags });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while creating post',
        error.message,
      );
    }
  }

  /**
   * Get all posts.
   */
  async getPosts() {
    try {
      return await this.postRepository.find({
        relations: {
          // metaOptions: true, // Uncomment this line to include meta options
          // author: true, // Uncomment this line to include author
          // tags: true, // Uncomment this line to include tags
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while fetching posts',
        error.message,
      );
    }
  }

  /**
   * Get a post by id.
   * @param id The post id.
   */
  getPost(id: string) {
    return {
      id,
      title: `Post ${id}`,
      content: `This is post ${id}`,
    };
  }

  /**
   * Update a post.
   * @param updatePostDto The updated post data.
   */
  async updatePost(updatePostDto: UpdatePostDto) {
    // Find the tags by ids
    const tags = await this.tagsService.findMultipleByIds(updatePostDto.tags);
    // Find the post by id

    try {
      const post = await this.postRepository.findOneBy({
        id: updatePostDto.id,
      });
      // Update the post
      // If the updatePostDto value is null, use the post value
      // update method is available in the repository but can be buggy for entity with multiple relations, need to test
      return await this.postRepository.save({
        title: updatePostDto.title ?? post.title,
        content: updatePostDto.content ?? post.content,
        schema: updatePostDto.schema ?? post.schema,
        featuredImageUrl:
          updatePostDto.featuredImageUrl ?? post.featuredImageUrl,
        publishedOn: updatePostDto.publishedOn ?? post.publishedOn,
        postType: updatePostDto.postType ?? post.postType,
        status: updatePostDto.status ?? post.status,
        slug: updatePostDto.slug ?? post.slug,
        tags,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while updating post',
        error.message,
      );
    }
  }

  /**
   * Delete a post.
   * @param id The post id.
   */

  async deletePost(id: string) {
    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while deleting post',
        error.message,
      );
    }
  }
}
