import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // for class-validator
  app.useGlobalPipes(new ValidationPipe());
  // for exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // for docs auth
  app.use(
    ['/docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER as string]: process.env
          .SWAGGER_PASSWORD as string,
      },
    }),
  );
  // for swagger
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // endpoint : /docs

  // for serving files. (express 종속적인듯. generic으로 NestExpressApp인 것을 명시해줘야 사용 가능)
  app.useStaticAssets(path.join(__dirname, 'uploads'), {
    prefix: '/media',
  });
  // for cors
  app.enableCors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  });
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
