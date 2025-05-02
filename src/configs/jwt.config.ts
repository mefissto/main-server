import { registerAs } from '@nestjs/config';

import { JWTConfig } from '@constants/env-variables.constants';

/**
 * The JWT configuration.
 */
export default registerAs(JWTConfig.NAME, () => ({
  [JWTConfig.JWT_SECRET]: process.env.JWT_SECRET,
  [JWTConfig.JWT_AUDIENCE]: process.env.JWT_TOKEN_AUDIENCE,
  [JWTConfig.JWT_ISSUER]: process.env.JWT_TOKEN_ISSUER,
  [JWTConfig.JWT_ACCESS_TOKEN_TTL]: parseInt(
    process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',
    10,
  ),
  [JWTConfig.JWT_REFRESH_TOKEN_TTL]: parseInt(
    process.env.JWT_REFRESH_TOKEN_TTL ?? '86400',
    10,
  ),
  [JWTConfig.GOOGLE_CLIENT_ID]: process.env.GOOGLE_CLIENT_ID,
  [JWTConfig.GOOGLE_CLIENT_SECRET]: process.env.GOOGLE_CLIENT_SECRET,
}));
