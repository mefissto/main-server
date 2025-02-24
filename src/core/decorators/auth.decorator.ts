import { SetMetadata } from '@nestjs/common';

import { AUTH_TYPE_KEY } from '@constants/auth.constants';
import { AuthType } from '@enums/auth-type.enum';

/**
 * The Auth decorator.
 * @param {AuthType[]} authTypes The auth types.
 * @returns {MethodDecorator} The method decorator.
 */
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
