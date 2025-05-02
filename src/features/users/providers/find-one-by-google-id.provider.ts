import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@features/users/entities/user.entity';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        googleId,
      },
    });
  }
}
