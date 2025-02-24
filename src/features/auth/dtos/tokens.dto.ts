import { ApiProperty } from '@nestjs/swagger';

/**
 * The tokens DTO.
 */
export class TokensDto {
  /**
   * The access token.
   */
  @ApiProperty({
    description: 'The access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmNoaW0gQmFyYXRoYW5pIiwiaWF0IjoxNTE2MjM5MDIyfQ.4j6l8Zx5QbU2Q8HvXnqV9X2QlX5QbU2Q8HvXnqV9X2Q',
  })
  accessToken: string;

  /**
   * The refresh token.
   */
  @ApiProperty({
    description: 'The refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmNoaW0gQmFyYXRoYW5pIiwiaWF0IjoxNTE2MjM5MDIyfQ.4j6l8Zx5QbU2Q8HvXnqV9X2QlX5QbU2Q8HvXnqV9X2Q',
  })
  refreshToken: string;
}
