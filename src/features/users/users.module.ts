import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@features/auth/auth.module';

import profileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider, CreateUserProvider],
  exports: [UsersService],
})
export class UsersModule {}
