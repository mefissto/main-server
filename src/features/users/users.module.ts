import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
