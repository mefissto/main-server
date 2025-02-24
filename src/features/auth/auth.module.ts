import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@features/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), JwtModule],
  providers: [
    AuthService,
    GenerateTokensProvider,
    RefreshTokensProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
