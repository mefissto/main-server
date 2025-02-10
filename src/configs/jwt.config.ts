import { registerAs } from '@nestjs/config';

import { JWTConfig } from '@constants/env-variables.constants';

export default registerAs(JWTConfig.NAME, () => ({
  [JWTConfig.JWT_SECRET]: process.env.JWT_SECRET,
  [JWTConfig.JWT_AUDIENCE]: process.env.JWT_TOKEN_AUDIENCE,
  [JWTConfig.JWT_ISSUER]: process.env.JWT_TOKEN_ISSUER,
  [JWTConfig.JWT_ACCESS_TOKEN_TTL]: parseInt(
    process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',
    10,
  ),
}));
