import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

/**
 * Data transfer object (DTO) with the structure of a request to create many users
 */
export class CreateManyUsersDto {
  /**
   * The users to create
   */
  @ApiProperty({
    type: [CreateUserDto],
    description: 'The users to create',
    items: { type: 'User' },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true, message: 'Each user must be a valid object' })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
