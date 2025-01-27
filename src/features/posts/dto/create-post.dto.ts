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
    Matches,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';
import { PostMetaOptionsDto } from './post-meta-options.dto';

export class CreatePostDto {
  @ApiProperty({
    example: 'My first post',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: PostType.POST,
    description: 'The type of the post',
    enum: PostType,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    example: 'my-first-post',
    description: 'The slug of the post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Slug can only contain lowercase alphanumeric characters and hyphens',
  })
  slug: string;

  @ApiProperty({
    example: PostStatus.DRAFT,
    description: 'The status of the post',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    example: 'This is my first post. Welcome to my blog!',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example: '{ "type": "object" }',
    description: 'The JSON schema of the post',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The featured image URL of the post',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date the post was published on',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    example: ['tag1', 'tag2'],
    description: 'The tags of the post',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: [{ key: 'author', value: 'John Doe' }],
    description: 'The meta options of the post',
    type: [PostMetaOptionsDto],
  })
  @IsOptional()
  @IsArray()
  @Type(() => PostMetaOptionsDto)
  @ValidateNested({ each: true })
  metaOptions?: PostMetaOptionsDto[];
}
