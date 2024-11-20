import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const result: UserEntity = { id: 1, ...userDto };

    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await service.create(userDto)).toEqual(result);
  });

  it('should find a user by id', async () => {
    const result: UserEntity = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    expect(await service.findOne(1)).toEqual(result);
  });

  it('should update a user', async () => {
    const userDto: UpdateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const result: UserEntity = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      ...userDto,
    };

    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await service.update(1, userDto)).toEqual(result);
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);

    expect(await service.remove(1)).toEqual(undefined);
  });
});
