import { HashingProvider } from '@features/auth/providers/hashing.provider';
import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * Create a user.
   * @param data
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      // If user already exists, return a 400 error with the error message
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const user = this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });

      return await this.userRepository.save(user);
    } catch (error) {
      // If the error is a BadRequestException, rethrow it
      if (error instanceof BadRequestException) {
        throw error;
      }

      // If there is an error creating the user, return a 500 error with the error message
      throw new InternalServerErrorException(
        'Error during creating user',
        error.message,
      );
    }
  }
}
