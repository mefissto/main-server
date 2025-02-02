import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingProvider } from './hashing.provider';

/**
 * The Bcrypt hashing provider.
 */
@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hash a password.
   * @param data
   * @returns
   */
  async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(data, salt);
  }

  /**
   * Compare a password with a hash.
   * @param data
   * @param hash
   * @returns
   */
  async comparePassword(data: string | Buffer, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
