import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

class UpdateUser extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends OmitType(UpdateUser, [
  'password',
] as const) {}
