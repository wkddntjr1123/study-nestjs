import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.scheme';

export class CatsRequestDto extends PickType(Cat, [
  'email',
  'password',
  'name',
] as const) {}
