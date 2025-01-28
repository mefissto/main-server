import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

/**
 * The data transfer object (DTO) that represents the tag creation data.
 */
export class CreateTagDto {
  /** The name of the tag. */
  @ApiProperty({
    example: 'My tag',
    description: 'The name of the tag',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  /** The slug of the tag. */
  @ApiProperty({
    example: 'my-tag',
    description: 'The slug of the tag',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Slug can only contain lowercase alphanumeric characters and hyphens',
  })
  slug: string;

  /** The description of the tag. */
  @ApiPropertyOptional({
    example: 'This is my first tag. Welcome to my blog!',
    description: 'The description of the tag',
  })
  @IsString()
  @IsOptional()
  description?: string;

  /** The json schema of the tag. */
  @ApiPropertyOptional({
    example: '{ "type": "object" }',
    description: 'The JSON schema of the tag',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  /**  The featured image URL of the tag. */
  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The featured image URL of the tag',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
