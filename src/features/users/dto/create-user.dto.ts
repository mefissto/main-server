import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username must be at least 8 characters long',
    example: 'john_doe_78',
    required: true,
    maxLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @ApiProperty({
    description: 'Email must be a valid email address',
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters long',
    example: '12345678',
    required: true,
    maxLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
