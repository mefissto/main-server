import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '@features/users/users.service';

import { User } from '@features/users/entities/user.entity';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { TokensDto } from './dtos/tokens.dto';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

/**
 * The authentication service.
 */
@Injectable()
export class AuthService {
  /**
   * The authentication service constructor.
   * @param userService The users service.
   * @param hashingProvider The hashing provider.
   * @param jwtService The JWT service.
   * @param jwtConfiguration The JWT configuration.
   */
  constructor(
    // Inject the users service
    private readonly userService: UsersService,
    // Inject the hashing provider
    private readonly hashingProvider: HashingProvider,
    // Inject the RefreshTokensProvider
    private readonly refreshTokensProvider: RefreshTokensProvider,
    // Inject the GenerateTokensProvider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Sign in a user.
   * @param {SignInDto} signInDto The sign in DTO.
   * @returns {Promise<TokensDto>} The tokens.
   */
  async signIn(signInDto: SignInDto): Promise<TokensDto> {
    const user = await this.userService.findOneByEmail(signInDto.email);
    let isPasswordValid: boolean;

    try {
      isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during sign in',
        error.message,
      );
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateTokensProvider.generateTokens(user);
  }

  /**
   * Sign up a user.
   * @param {SignUpDto} signUpDto The sign up DTO.
   * @returns {Promise<User>} The user.
   */
  async signUp(signUpDto: SignUpDto): Promise<User> {
    // Hash the password before creating the user

    try {
      signUpDto.password = await this.hashingProvider.hashPassword(
        signUpDto.password,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during sign up',
        error.message,
      );
    }

    return this.userService.create(signUpDto);
  }

  /**
   * Refresh the tokens.
   * @param {RefreshTokenDto} refreshTokenDto The refresh token DTO.
   * @returns {Promise<TokensDto>} The tokens.
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
