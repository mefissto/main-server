import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import jwtConfig from '@configs/jwt.config';
import { REQUEST_USER_KEY } from '@constants/auth.constants';

/**
 * The access token guard.
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // Inject the JWT service
    private readonly jwtService: JwtService,
    // Inject the JWT configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(this.jwtConfiguration);
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        maxAge: this.jwtConfiguration.accessTokenTtl,
      });

      // Attach the user to the request
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (error) {
      throw new InternalServerErrorException('Error during token verification');
    }

    return true;
  }

  private extractToken(request: Request): string {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    return token;
  }
}
