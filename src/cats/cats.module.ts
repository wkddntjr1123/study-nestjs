import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // 다른 module에서 캡슐화된 CatsService에 접근 가능. provider로써 DI 가능
  exports: [CatsService],
})
export class CatsModule {}
