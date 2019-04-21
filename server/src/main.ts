import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { NextFunction } from 'connect';
import { performance } from "perf_hooks";

const NEST_PORT = process.env.PORT || 3000;
const CLIENT_FILES = join(__dirname, '..', '..', 'client', 'dist');

const logRequestStart = (req: Request, res, next: NextFunction) => {
  const t0 = performance.now();
  res.on('finish', () => {
    const t1 = performance.now();
    console.info(`${req.method} ${(req as any).originalUrl} | ${res.statusCode} ${res.statusMessage}; ${Math.ceil((res.get('Content-Length') || 0)/1024)} KB; ${(t1-t0).toFixed(0)} ms`);
  });
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logRequestStart);
  app.use(express.static(CLIENT_FILES));
  app.setGlobalPrefix('api');
  await app.listen(NEST_PORT);
}
bootstrap();
