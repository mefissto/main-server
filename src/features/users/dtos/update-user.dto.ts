import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

/**
 * The partial user update data.
 */
class UpdateUser extends PartialType(CreateUserDto) {}

/**
 * The data transfer object (DTO) that represents the user update data.
 */
export class UpdateUserDto extends OmitType(UpdateUser, [
  'password',
] as const) {}
