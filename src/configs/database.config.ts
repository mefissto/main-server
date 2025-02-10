import { registerAs } from '@nestjs/config';

import { DatabaseConfig } from '@constants/env-variables.constants';

export default registerAs(DatabaseConfig.NAME, () => ({
  [DatabaseConfig.DATABASE_HOST]: process.env.DATABASE_HOST || 'localhost',
  [DatabaseConfig.DATABASE_PORT]: parseInt(process.env.DATABASE_PORT) || 5432,
  [DatabaseConfig.DATABASE_USERNAME]: process.env.DATABASE_USERNAME,
  [DatabaseConfig.DATABASE_PASSWORD]: process.env.DATABASE_PASSWORD,
  [DatabaseConfig.DATABASE_NAME]: process.env.DATABASE_NAME,
  [DatabaseConfig.SYNCHRONIZE]:
    process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
  [DatabaseConfig.AUTOLOAD_ENTITIES]:
    process.env.DATABASE_AUTOLOAD_ENTITIES === 'true' ? true : false,
}));
