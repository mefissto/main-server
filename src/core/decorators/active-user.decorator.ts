import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { REQUEST_USER_KEY } from '@constants/auth.constants';
import { ActiveUserData } from '@interfaces/active-user-data.interface';

/**
 * The ActiveUser decorator.
 * @param {keyof ActiveUserData} field The field.
 * @returns {ParameterDecorator} The parameter decorator.
 */
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];

    if (!user) {
      return null;
    }

    return field ? user[field] : user;
  },
);
