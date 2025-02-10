import { registerAs } from '@nestjs/config';

import { AppConfig } from '@constants/env-variables.constants';

export default registerAs(AppConfig.NAME, () => ({
  [AppConfig.ENVIRONMENT]: process.env.NODE_ENV || 'production',
}));
