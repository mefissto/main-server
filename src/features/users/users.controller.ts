import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { USERS } from '@core/constants/routes';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

/**
 * Controller for users
 */
@ApiTags(USERS.NAME)
@Controller(USERS.ROOT)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users
   * @param page
   * @param limit
   * @returns all users
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'All users.',
    type: [User],
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  /**
   * Get user by id
   * @param id
   * @returns
   */
  @Get(USERS.ID)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: USERS.ID, required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'User by id.',
    type: User,
  })
  findOne(@Param(USERS.ID) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Create user
   * @param createUserDto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Update user
   * @param id
   * @param updateUserDto
   * @returns
   */
  @Patch(USERS.ID)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Json structure for user object',
  })
  update(@Param(USERS.ID) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete user
   * @param id
   * @returns
   */
  @Delete(USERS.ID)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: USERS.ID, required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully removed.',
  })
  remove(@Param(USERS.ID) id: string) {
    return this.usersService.remove(id);
  }
}
