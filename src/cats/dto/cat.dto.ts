import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.scheme';

export class ReadonlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'aksdckds21masx',
    description: '아이디',
    required: true,
  })
  id: string;
}
