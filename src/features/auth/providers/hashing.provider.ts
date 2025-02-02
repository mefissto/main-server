import { Injectable } from '@nestjs/common';

/**
 * The hashing provider.
 */
@Injectable()
export abstract class HashingProvider {
  /**
   * Hash a password.
   * @param data The data to hash.
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compare a password with a hash.
   * @param data The data to compare.
   * @param hash The hash to compare.
   */
  abstract comparePassword(
    data: string | Buffer,
    hash: string,
  ): Promise<boolean>;
}
