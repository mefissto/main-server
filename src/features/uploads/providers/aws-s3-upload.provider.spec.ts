import { Test, TestingModule } from '@nestjs/testing';

import { AwsS3UploadProvider } from './aws-s3-upload.provider';

describe('AwsS3UploadProvider', () => {
  let provider: AwsS3UploadProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsS3UploadProvider],
    }).compile();

    provider = module.get<AwsS3UploadProvider>(AwsS3UploadProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
