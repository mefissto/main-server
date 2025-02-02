import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '@core/pagination/dtos/pagination-query.dto';

/**
 * The base DTO for getting posts.
 */
class GetPostsBaseDto extends PaginationQueryDto {
  /**
   * The start date of the post.
   */
  @ApiPropertyOptional({ type: Date, format: 'date', example: '2021-01-01' })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  /**
   * The end date of the post.
   */
  @ApiPropertyOptional({ type: Date, format: 'date', example: '2021-01-01' })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

/**
 * The DTO for getting posts with pagination.
 */
export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
