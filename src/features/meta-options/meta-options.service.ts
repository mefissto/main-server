import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOption } from './entities/meta-option.entity';

/**
 * The service that provides the meta options.
 */
@Injectable()
export class MetaOptionsService {
  /**
   * Initializes the service with the injected repositories.
   *
   * @param metaOptionsRepository The repository of the meta options.
   */
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creates a new meta option.
   */
  async create(
    createMetaOptionsDto: CreateMetaOptionsDto,
  ): Promise<MetaOption> {
    try {
      const metaOption =
        this.metaOptionsRepository.create(createMetaOptionsDto);

      return this.metaOptionsRepository.save(metaOption);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while creating meta option',
        error.message,
      );
    }
  }
}
