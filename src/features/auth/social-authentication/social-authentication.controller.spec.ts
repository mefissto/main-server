import { Test, TestingModule } from '@nestjs/testing';

import { SocialAuthenticationController } from './social-authentication.controller';

describe('SocialAuthenticationController', () => {
  let controller: SocialAuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialAuthenticationController],
    }).compile();

    controller = module.get<SocialAuthenticationController>(
      SocialAuthenticationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
