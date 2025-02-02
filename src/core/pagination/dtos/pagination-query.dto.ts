import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

/**
 * The pagination query DTO.
 */
export class PaginationQueryDto {
  /**
   * The page number.
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number = 1;

  /**
   * The items limit.
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
