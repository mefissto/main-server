import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import jwtConfig from '@configs/jwt.config';
import { User } from '@features/users/entities/user.entity';
import { ActiveUserData } from '@interfaces/active-user-data.interface';
import { TokensDto } from '../dtos/tokens.dto';

/**
 * The generate tokens provider.
 */
@Injectable()
export class GenerateTokensProvider {
  constructor(
    // Inject the JWT service
    private readonly jwtService: JwtService,
    // Inject the JWT configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Sign a token.
   * @param {string} userId The user ID.
   * @param {number} expiresIn The expiration time.
   * @param {T=} payload The payload.
   * @returns {string} The signed token.
   */
  async signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    try {
      return await this.jwtService.signAsync(
        {
          sub: userId,
          ...(payload || {}),
        },
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          expiresIn,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during generating token',
        error.message,
      );
    }
  }

  /**
   * Generate tokens.
   * @param {User} user The user.
   * @returns {Promise<TokensDto>} The tokens
   */
  async generateTokens(user: User): Promise<TokensDto> {
    const accessToken = await this.signToken<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
      {
        email: user.email,
      },
    );
    const refreshToken = await this.signToken(
      user.id,
      this.jwtConfiguration.refreshTokenTtl,
    );

    return { accessToken, refreshToken };
  }
}
