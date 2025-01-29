import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Create a post.
   * @param post The post data.
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);

    return await this.postRepository.save(post);
  }

  /**
   * Get all posts.
   */
  async getPosts() {
    return await this.postRepository.find();
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
   * @param id The post id.
   * @param updatePostDto The updated post data.
   */
  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return {
      id,
      ...updatePostDto,
    };
  }

  /**
   * Delete a post.
   * @param id The post id.
   */

  async deletePost(id: string) {
    return await this.postRepository.delete(id);
  }
}
