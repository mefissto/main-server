import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostMetaOptionsDto {
  @ApiProperty({ example: 'author', description: 'The key of the meta option' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The value of the meta option',
  })
  @IsNotEmpty()
  value: any;
}
