import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

/**
 * The data transfer object (DTO) that represents the post update data.
 */
export class UpdatePostDto extends PartialType(CreatePostDto) {
  /** The id of the post. */
  @ApiProperty({
    example: 'test-id-12312',
    description: 'The id of the post',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
