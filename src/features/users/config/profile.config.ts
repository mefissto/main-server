import { registerAs } from '@nestjs/config';

import { ProfileConfig } from '@constants/env-variables.constants';

export default registerAs(ProfileConfig.NAME, () => ({
  [ProfileConfig.PROFILE_API_KEY]: process.env.PROFILE_API_KEY,
}));
