import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * The refresh token DTO.
 */
export class RefreshTokenDto {
  /**
   * The refresh token.
   */
  @ApiProperty({
    description: 'The refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmNoaW0gQmFyYXRoYW5pIiwiaWF0IjoxNTE2MjM5MDIyfQ.4j6l8Zx5QbU2Q8HvXnqV9X2QlX5QbU2Q8HvXnqV9X2Q',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
