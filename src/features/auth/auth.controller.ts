import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * The authentication controller.
 */
@Controller('auth')
export class AuthController {
  /**
   * The authentication controller constructor.
   * @param authService The authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('register')
  async register() {
    return this.authService.register();
  }
}
