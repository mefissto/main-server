import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './entities/tag.entity';

/**
 * Service for tags
 */
@Injectable()
export class TagsService {
  /**
   * The constructor
   * @param tagRepository The tag repository
   */
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * Get all tags
   */
  async getTags() {
    try {
      return await this.tagsRepository.find({
        // withDeleted: true, // Uncomment this line to include soft deleted tags
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while fetching tags',
        error.message,
      );
    }
  }

  /**
   * Create a tag
   */
  async createTag(createTagDto: CreateTagDto) {
    try {
      const tag = this.tagsRepository.create(createTagDto);
      return await this.tagsRepository.save(tag);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while creating tag',
        error.message,
      );
    }
  }

  /**
   * Find a tag by id
   * @param id The tag id
   */
  async findMultipleByIds(ids: string[]) {
    try {
      return await this.tagsRepository.findBy({ id: In(ids) });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while fetching tags',
        error.message,
      );
    }
  }

  /**
   * Delete a tag by id
   * @param id The tag id
   */
  async deleteTag(id: string) {
    try {
      return await this.tagsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while deleting tag',
        error.message,
      );
    }
  }

  /**
   * Soft delete a tag by id
   * @param id The tag id
   */
  async softDeleteTag(id: string) {
    try {
      return await this.tagsRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while deleting tag',
        error.message,
      );
    }
  }
}
