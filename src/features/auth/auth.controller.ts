import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

/**
 * The authentication controller.
 */
@Controller('auth')
export class AuthController {
  /**
   * The authentication controller constructor.
   * @param authService The authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign in a user.
   * @param signInDto The sign in DTO.
   */
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sign in a user.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp() {
    return this.authService.signUp();
  }
}
