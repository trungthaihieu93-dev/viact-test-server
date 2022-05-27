import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ResponseInterceptor } from './core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.API_PORT);
}

bootstrap();
