import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import path from 'path';
import { v7 } from 'uuid';

import { AppConfig } from '@constants/env-variables.constants';

@Injectable()
export class AwsS3UploadProvider {
  private readonly s3 = new S3();

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new InternalServerErrorException('No file provided for upload');
    }

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get(
            `${AppConfig.NAME}.${AppConfig.AWS_PUBLIC_BUCKET_NAME}`,
          ),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error uploading file to S3: ${error.message}`,
      );
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileName = path
      .basename(file.originalname, fileExtension)
      .replace(/\s+/g, '');
    const timestamp = Date.now();

    return `${fileName}-${timestamp}-${v7()}${fileExtension}`;
  }
}
