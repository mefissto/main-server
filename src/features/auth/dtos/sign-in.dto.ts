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

export class SignInDto {
  /** The email of the user. */
  @ApiProperty({
    description: 'Email must be a valid email address',
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  /** The password of the user. */
  @ApiProperty({
    description:
      'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    example: '12345678',
    required: true,
    maxLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  })
  password: string;
}
