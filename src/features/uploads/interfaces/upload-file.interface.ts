import { FileTypes } from '../enums/file-types.enum';

export interface UploadFile {
  name: string;
  originalName: string;
  path: string;
  filetype: FileTypes;
  mimetype: string;
  size: number;
}
