import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_DEV_FILE_PATH } from '@constants/common';
import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@features/users/users.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_DEV_FILE_PATH }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
