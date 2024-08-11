import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

async function bootstrap() {
  dotenv.config({ path: resolve(__dirname, '../.env') });
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN_CORS,
    methods: process.env.ENABLED_METHODS,
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.APP_PORT);
}
bootstrap();