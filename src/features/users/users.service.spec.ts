import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let mockUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    mockUser = {
      id: '1',
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: '123',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto: CreateUserDto = {
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: '2345',
    };
    const result: User = { ...mockUser, ...userDto };

    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await service.create(userDto)).toEqual(result);
  });

  it('should find a user by id', async () => {
    const result: User = mockUser;

    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    expect(await service.findOne('1')).toEqual(result);
  });

  it('should update a user', async () => {
    const userDto: UpdateUserDto = {
      username: 'John Doe',
      email: 'john.doe@example.com',
    };
    const result: User = {
      ...mockUser,
      ...userDto,
    };

    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await service.update('1', userDto)).toEqual(result);
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);

    expect(await service.remove('1')).toEqual(undefined);
  });
});
