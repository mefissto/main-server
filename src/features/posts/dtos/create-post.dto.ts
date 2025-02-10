import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-meta-options.dto';
import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';

/**
 * The data transfer object (DTO) that represents the post creation data.
 */
export class CreatePostDto {
  /** The title of the post. */
  @ApiProperty({
    example: 'My first post',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(512)
  title: string;

  /** The type of the post. */
  @ApiProperty({
    example: PostType.POST,
    description: 'The type of the post',
    enum: PostType,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  /** The slug of the post. */
  @ApiProperty({
    example: 'my-first-post',
    description: 'The slug of the post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Slug can only contain lowercase alphanumeric characters and hyphens',
  })
  slug: string;

  /** The status of the post. */
  @ApiProperty({
    example: PostStatus.DRAFT,
    description: 'The status of the post',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  /** The content of the post. */
  @ApiPropertyOptional({
    example: 'This is my first post. Welcome to my blog!',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  /** The schema of the post. */
  @ApiPropertyOptional({
    example: '{ "type": "object" }',
    description: 'The JSON schema of the post',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  /** The featuredImageUrl of the post. */
  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The featured image URL of the post',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  /** The publishedOn date of the post. */
  @ApiPropertyOptional({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date the post was published on',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  /** The tags of the post. */
  @ApiPropertyOptional({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    description: 'The tags of the post',
    type: 'array',
    items: {
      type: 'string',
      format: 'uuid',
    },
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsUUID('all', { each: true })
  tags?: string[];

  /** The meta options of the post. */
  @ApiPropertyOptional({
    example: { metaValue: '{"key": "value"}' },
    description: 'The meta options of the post',
    type: CreateMetaOptionsDto,
  })
  @IsOptional()
  @Type(() => CreateMetaOptionsDto)
  @ValidateNested({ each: true })
  metaOptions?: CreateMetaOptionsDto | null;
}
