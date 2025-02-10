import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@features/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), JwtModule],
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
