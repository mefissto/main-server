import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';

import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    {
      name: 'Content-Type',
      description: 'multipart/form-data',
      required: true,
    },
    {
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    },
  ])
  @ApiOperation({
    summary: 'Upload an image file',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file);
  }
}
