import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOption } from './entities/meta-option.entity';
import { MetaOptionsService } from './meta-options.service';

/**
 * Controller for meta options
 */
@Controller('meta-options')
export class MetaOptionsController {
  /**
   * Initializes the controller with the meta options service.
   *
   * @param metaOptionsService The meta options service
   */
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  /**
   * Creates a new meta option.
   */
  @ApiOperation({ summary: 'Create a new meta option' })
  @ApiResponse({
    status: 201,
    description: 'The meta option has been successfully created',
  })
  @Post()
  create(
    @Body() createMetaOptionsDto: CreateMetaOptionsDto,
  ): Promise<MetaOption> {
    return this.metaOptionsService.create(createMetaOptionsDto);
  }
}
