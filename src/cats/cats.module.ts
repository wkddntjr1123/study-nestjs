import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { Cat, CatScheme } from './cats.scheme';
import { CatsService } from './cats.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatScheme }])], // for DI model
  controllers: [CatsController],
  providers: [CatsService],
  // 다른 module에서 캡슐화된 CatsService에 접근 가능. provider로써 DI 가능
  exports: [CatsService],
})
export class CatsModule {}
