import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PASSWORD_REGEX } from '@constants/common.constants';

/**
 * The data transfer object (DTO) that represents the user creation data.
 */
export class CreateUserDto {
  /** The username of the user. */
  @ApiProperty({
    description: 'Username must be at least 3 characters long',
    example: 'john_doe_78',
    required: true,
    maxLength: 96,
    minLength: 3,
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 8 characters long' })
  @MaxLength(96, { message: 'Username is too long' })
  username: string;

  /** The email of the user. */
  @ApiProperty({
    description: 'Email must be a valid email address',
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(96, { message: 'Email is too long' })
  email: string;

  /** The password of the user. */
  @ApiProperty({
    description:
      'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    example: '12345678',
    required: true,
    maxLength: 8,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(96, { message: 'Password is too long' })
  @Matches(PASSWORD_REGEX, {
    message: 'Password must be 8+ chars, 1 upper, 1 lower, 1 number, 1 special',
  })
  password: string;
}
