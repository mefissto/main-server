import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let existingUser: User;
    try {
      // Check if user already exists
      existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      // If there is an error fetching the user, return a 500 error with the error message
      throw new Error('Internal server error');
    }

    if (existingUser) {
      // If user already exists, return a 400 error with the error message
      throw new Error('User already exists');
    }

    try {
      // Create user if it does not exist yet
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      // If there is an error creating the user, return a 500 error with the error message
      throw new Error('Internal server error');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // If there is an error fetching the users, return a 500 error with the error message
      throw new Error('Internal server error');
    }
  }

  async findOne(id: string): Promise<User> {
    return await this.findOneByIdOrFail(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update({ id }, updateUserDto);
    } catch (error) {
      // If there is an error updating the user, return a 500 error with the error message
      throw new Error('Internal server error');
    }

    return await this.findOneByIdOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOneByIdOrFail(id); // Check if user exists before deleting it

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      // If there is an error deleting the user, return a 500 error with the error message
      throw new Error('Internal server error');
    }
  }

  private async findOneByIdOrFail(id: string): Promise<User> {
    let user: User;

    try {
      user = await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      // If user does not exist, return a 404 error with the error message
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
