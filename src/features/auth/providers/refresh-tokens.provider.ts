import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

import jwtConfig from '@configs/jwt.config';
import { UsersService } from '@features/users/users.service';

import { TokensDto } from '../dtos/tokens.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';

/**
 * The refresh tokens provider.
 */
@Injectable()
export class RefreshTokensProvider {
  constructor(
    // Inject the users service
    private readonly userService: UsersService,
    // Inject the JWT service
    private readonly jwtService: JwtService,
    // Inject the GenerateTokensProvider
    private readonly generateTokensProvider: GenerateTokensProvider,
    // Inject the JWT configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Refresh the tokens.
   * @param {RefreshTokenDto} refreshTokenDto The refresh token DTO.
   * @returns {Promise<TokensDto>} The tokens.
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    const { refreshToken } = refreshTokenDto;
    let userId: string;

    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      userId = sub;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during verifying refresh token',
        error.message,
      );
    }

    const user = await this.userService.findOneByIdOrFail(userId);

    return this.generateTokensProvider.generateTokens(user);
  }
}
