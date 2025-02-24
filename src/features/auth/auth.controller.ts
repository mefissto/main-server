import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Auth } from '@decorators/auth.decorator';
import { AuthType } from '@enums/auth-type.enum';
import { User } from '@features/users/entities/user.entity';

import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { TokensDto } from './dtos/tokens.dto';

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
   * @param {SignInDto} signInDto The sign in DTO.
   * @returns {Promise<TokensDto>} The tokens.
   */
  @Post('sign-in')
  @Auth(AuthType.NONE)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sign in a user.',
    type: TokensDto,
  })
  async signIn(@Body() signInDto: SignInDto): Promise<TokensDto> {
    return this.authService.signIn(signInDto);
  }

  /**
   * Sign up a user.
   * @param {SignUpDto} signUpDto The sign up DTO.
   * @returns {Promise<User>} The user.
   */
  @Post('sign-up')
  @Auth(AuthType.NONE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sign up a user.',
    type: User,
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  /**
   * Refresh the tokens.
   * @param {RefreshTokenDto} refreshTokenDto The refresh token DTO.
   * @returns {Promise<TokensDto>} The tokens.
   */
  @Post('refresh-token')
  @Auth(AuthType.NONE)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh the tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns new tokens.',
    type: TokensDto,
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
