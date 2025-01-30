import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';

/**
 * Controller for tags
 */
@Controller('tags')
export class TagsController {
  /**
   * The constructor
   * @param tagsService The tags service
   */
  constructor(private readonly tagsService: TagsService) {}

    /**
     * Get all tags
     */
    @Get()
    getTags() {
      return this.tagsService.getTags();}

  /**
   * Create a tag
   */
  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  /**
   * Delete a tag by id
   * @param id The tag id
   */
  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagsService.deleteTag(id);
  }

  /**
   * Soft delete a tag by id
   * @param id The tag
   */
  @Delete('soft-delete/:id')
  softDeleteTag(@Param('id') id: string) {
    return this.tagsService.softDeleteTag(id);
  }
}
