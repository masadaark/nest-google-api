import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CfgClass from './config/env.config';
import { ApiExceptionHandler } from './handler/apiexception.handler';

async function bootstrap() {
  await CfgClass.Init();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApiExceptionHandler());
  await app.listen(3000);
}
bootstrap();
