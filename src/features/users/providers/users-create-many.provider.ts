import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../entities/user.entity';

/**
 * The users create many provider.
 */
@Injectable()
export class UsersCreateManyProvider {
  /**
   * The constructor.
   * @param dataSource The data source.
   */
  constructor(
    // Inject the DataSource - for learning purposes
    private readonly dataSource: DataSource,
  ) {}

  // For transaction learning purposes
  async createMany(createManyUsersDto: CreateManyUsersDto): Promise<User[]> {
    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect query runner to the database
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred during starting transaction',
        error.message,
      );
    }
    const users = [];

    try {
      // Loop through the users and create them
      for (const createUserDto of createManyUsersDto.users) {
        const user = queryRunner.manager.create(User, createUserDto);
        users.push(await queryRunner.manager.save(user));
      }

      // Commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback transaction
      await queryRunner.rollbackTransaction();

      throw new ConflictException(
        'Could not complete create users transaction',
        error.message,
      );
    } finally {
      // Release query runner
      try {
        await queryRunner.release();
      } catch (error) {
        throw new InternalServerErrorException(
          'Error occurred during releasing query runner',
          error.message,
        );
      }
    }

    return users;
  }
}
