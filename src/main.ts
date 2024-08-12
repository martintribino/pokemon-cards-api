import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config({ path: resolve(__dirname, '../.env') });
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN_CORS,
    methods: process.env.ENABLED_METHODS,
    credentials: true,
  });
  // Use global filters for exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    // Strips properties that are not part of the DTO
    whitelist: true,
    // Throws an error if non-whitelisted properties are present
    forbidNonWhitelisted: true,
    // Automatically transforms payloads to be objects typed according to their DTO classes
    transform: true,
  }));
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Pokemon Cards API')
    .setDescription('API documentation for Pokemon-themed project')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT' 
      },
      'access-token',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT);
}
bootstrap();