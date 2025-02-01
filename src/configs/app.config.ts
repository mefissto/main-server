import { registerAs } from '@nestjs/config';

import { AppConfig } from '@core/constants/env-variables';

export default registerAs(AppConfig.NAME, () => ({
  [AppConfig.ENVIRONMENT]: process.env.NODE_ENV || 'production',
}));
