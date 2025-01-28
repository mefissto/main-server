import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

/**
 * The data transfer object (DTO) that represents the post meta options data.
 */
export class CreateMetaOptionsDto {
  /** The value of the meta option. */
  @ApiProperty({
    example: 'John Doe',
    description: 'The value of the meta option',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
