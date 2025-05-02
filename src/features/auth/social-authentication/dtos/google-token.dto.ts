import { IsNotEmpty } from 'class-validator';

export class GoogleTokenDto {
  /** The access token. */
  @IsNotEmpty()
  token: string;
}
