import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_TYPE_KEY } from '@constants/auth.constants';
import { AuthType } from '@enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

/**
 * The authentication guard.
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType: AuthType = AuthType.BEARER;

  private readonly authTypeGuardMap: Record<AuthType, CanActivate> = {
    [AuthType.BEARER]: this.accessTokenGuard,
    [AuthType.NONE]: { canActivate: () => true },
  };

  /**
   * The authentication guard constructor.
   * @param reflector The reflector.
   * @param accessTokenGuard The access token guard.
   */
  constructor(
    // Inject the reflector
    private readonly reflector: Reflector,
    // Inject the access token guard
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((authType) => this.authTypeGuardMap[authType]);
    const error = new UnauthorizedException('Unauthorized');

    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => {
        throw error;
      });

      // If at least one guard allows the request, return true
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
