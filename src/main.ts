import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // for class-validator
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
