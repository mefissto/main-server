import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppConfig } from '@constants/env-variables.constants';
import { Upload } from './entities/upload.entity';
import { FileTypes } from './enums/file-types.enum';
import { UploadFile } from './interfaces/upload-file.interface';
import { AwsS3UploadProvider } from './providers/aws-s3-upload.provider';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
    private readonly configService: ConfigService,
    private readonly awsS3UploadProvider: AwsS3UploadProvider,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<any> {
    // Check if the file is an image
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const name = await this.awsS3UploadProvider.uploadFile(file);
    const cdnUrl = this.configService.get(
      `${AppConfig.NAME}.${AppConfig.AWS_CLOUDFRONT_URL}`,
    );
    const uploadFile: UploadFile = {
      name,
      originalName: file.originalname,
      filetype: FileTypes.IMAGE,
      mimetype: file.mimetype,
      size: file.size,
      path: `${cdnUrl}/${name}`,
    };

    try {
      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error saving file to database: ${error.message}`,
      );
    }
  }
}
