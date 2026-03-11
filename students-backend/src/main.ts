// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// import { ValidationPipe } from '@nestjs/common'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   app.enableCors()

//   app.useGlobalPipes(new ValidationPipe())

//   await app.listen(3000)
// }
// bootstrap()

// import { NestFactory } from '@nestjs/core'
// import { AppModule } from './app.module'
// import { ValidationPipe } from '@nestjs/common'

// async function bootstrap() {

//   const app = await NestFactory.create(AppModule)

//   app.enableCors()

//   app.useGlobalPipes(new ValidationPipe())

//   await app.listen(process.env.PORT || 3000)
// }

// bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription('Students CRUD API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();