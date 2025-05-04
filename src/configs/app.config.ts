import { registerAs } from '@nestjs/config';

import { AppConfig } from '@constants/env-variables.constants';

export default registerAs(AppConfig.NAME, () => ({
  [AppConfig.ENVIRONMENT]: process.env.NODE_ENV || 'production',
  [AppConfig.API_VERSION]: process.env.API_VERSION,
  [AppConfig.AWS_PUBLIC_BUCKET_NAME]: process.env.AWS_PUBLIC_BUCKET_NAME,
  [AppConfig.AWS_REGION]: process.env.AWS_REGION,
  [AppConfig.AWS_CLOUDFRONT_URL]: process.env.AWS_CLOUDFRONT_URL,
  [AppConfig.AWS_ACCESS_KEY_ID]: process.env.AWS_ACCESS_KEY_ID,
  [AppConfig.AWS_SECRET_ACCESS_KEY]: process.env.AWS_SECRET_ACCESS_KEY,
}));
