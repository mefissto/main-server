import { registerAs } from '@nestjs/config';

import { ProfileConfig } from '@core/constants/env-variables';

export default registerAs(ProfileConfig.NAME, () => ({
  [ProfileConfig.PROFILE_API_KEY]: process.env.PROFILE_API_KEY,
}));
