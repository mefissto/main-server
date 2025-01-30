import { Injectable } from '@nestjs/common';
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
    return await this.tagsRepository.find({
        'withDeleted': true
    });
  }

  /**
   * Create a tag
   */
  async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  /**
   * Find a tag by id
   * @param id The tag id
   */
  async findMultipleByIds(ids: string[]) {
    return await this.tagsRepository.findBy({ id: In(ids) });
  }

  /**
   * Delete a tag by id
   * @param id The tag id
   */
  async deleteTag(id: string) {
    return await this.tagsRepository.delete(id);
  }

  /**
   * Soft delete a tag by id
   * @param id The tag id
   */
  async softDeleteTag(id: string) {
    return await this.tagsRepository.softDelete(id);
  }
}
