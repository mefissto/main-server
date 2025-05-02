import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createGoogleUser(googleUser: GoogleUser): Promise<User> {
    try {
      const newUser = this.usersRepository.create(googleUser);
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating Google user: ${error.message}`,
      );
    }
  }
}
