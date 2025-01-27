import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    example: 'test-id-12312',
    description: 'The id of the post',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
