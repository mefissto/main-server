import { Body, Controller, Post } from '@nestjs/common';

import { Auth } from '@decorators/auth.decorator';
import { AuthType } from '@enums/auth-type.enum';

import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './providers/google-authentication.service';

@Auth(AuthType.NONE)
@Controller('social-authentication')
export class SocialAuthenticationController {
  constructor(
    // Inject the Google authentication service
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post('google')
  authenticateWithGoogle(@Body() googleTokenDto: GoogleTokenDto) {
    // Call the Google authentication service to authenticate the user with Google
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
