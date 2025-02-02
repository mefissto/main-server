import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import profileConfig from './config/profile.config';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

/**
 * Service for users
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param userRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // Inject the profile configuration - for learning purposes
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // Inject the users create many provider - for learning purposes
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {
    console.log(this.profileConfiguration);
  }

  /**
   * Create a new user
   * @param createUserDto
   * @returns User
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      // If user already exists, return a 400 error with the error message
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const user = this.userRepository.create(createUserDto);

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

  // For transaction learning purposes
  async createMany(createManyUsersDto: CreateManyUsersDto): Promise<User[]> {
    return this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * Get all users
   * @param page
   * @param limit
   * @returns
   */
  async findAll(page: number, limit: number): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // If there is an error fetching the users, return a 500 error with the error message
      // Custom exception handling
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error during fetching users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  /**
   * Get a user by id
   * @param id
   * @returns
   * @throws NotFoundException
   */
  async findOne(id: string): Promise<User> {
    return await this.findOneByIdOrFail(id);
  }

  /**
   * Update a user
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update({ id }, updateUserDto);
    } catch (error) {
      // If there is an error updating the user, return a 500 error with the error message
      throw new InternalServerErrorException(
        'Error updating user',
        error.message,
      );
    }

    return await this.findOneByIdOrFail(id);
  }

  /**
   * Remove a user
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.findOneByIdOrFail(id); // Check if user exists before deleting it

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      // If there is an error deleting the user, return a 500 error with the error message
      throw new InternalServerErrorException(
        'Error deleting user',
        error.message,
      );
    }
  }

  /**
   * Get a user by id or throw a 404 error
   * @param id
   * @returns
   * @throws NotFoundException
   */
  async findOneByIdOrFail(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      // If user does not exist, return a 404 error with the error message
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
