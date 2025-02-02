import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider],
  exports: [UsersService],
})
export class UsersModule {}
