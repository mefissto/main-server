import {
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@features/users/users.service';

import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { SignInDto } from './dtos/sign-in.dto';
import { HashingProvider } from './providers/hashing.provider';

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
    // Inject the JWT service
    private readonly jwtService: JwtService,
    // Inject the JWT configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Sign in a user.
   */
  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    console.log(user);
    try {
      const isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error during sign in',
        error.message,
      );
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );

    console.log(accessToken);

    return { accessToken };
  }

  /**
   * Sign up a user.
   */
  async signUp() {
    // Register logic
  }
}
