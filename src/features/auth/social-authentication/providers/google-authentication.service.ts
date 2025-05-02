import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

import jwtConfig from '@configs/jwt.config';
import { GenerateTokensProvider } from '@features/auth/providers/generate-tokens.provider';
import { GoogleUser } from '@features/users/interfaces/google-user.interface';
import { UsersService } from '@features/users/users.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly userService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit(): void {
    this.oauth2Client = new OAuth2Client(
      this.jwtConfiguration.googleClientId,
      this.jwtConfiguration.googleClientSecret,
    );
  }

  async authenticate(googleTokenDto: GoogleTokenDto): Promise<any> {
    try {
      const loginTicket = await this.oauth2Client.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // extract more information from the payload if needed
      const {
        sub: googleId,
        email,
        name: username,
        family_name: lastName,
        given_name: firstName,
        picture: accountImage,
      } = loginTicket.getPayload();
      const user = await this.userService.findOneByGoogleId(googleId);

      if (user) {
        // User exists, generate tokens
        return this.generateTokensProvider.generateTokens(user);
      } else {
        const userData: GoogleUser = {
          email,
          googleId,
          firstName,
          lastName,
          accountImage,
          username,
        };

        const newUser = await this.userService.createGoogleUser(userData);

        // Generate tokens for the new user
        return this.generateTokensProvider.generateTokens(newUser);
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Error authenticating with Google',
        error,
      );
    }
  }
}
