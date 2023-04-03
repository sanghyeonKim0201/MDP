import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocumnet } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  const config = new BaseAPIDocumnet().init()
  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documnet)

  await app.listen(8080);
}
bootstrap();
