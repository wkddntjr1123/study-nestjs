import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatScheme } from './cats.scheme';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatScheme }]), // for DI model
    MulterModule.register({
      dest: './upload', // for file upload. save in ./upload  상대경로가 현재 프로젝트 디렉토리가 시작
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  // 다른 module에서 캡슐화된 CatsService에 접근 가능. provider로써 DI 가능
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
