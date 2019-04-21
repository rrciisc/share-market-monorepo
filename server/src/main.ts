import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

const NEST_PORT = process.env.PORT || 3000;
const CLIENT_FILES = join(__dirname, '..', '..', 'client', 'dist');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(CLIENT_FILES));
  app.setGlobalPrefix('api');
  await app.listen(NEST_PORT);
}
bootstrap();
