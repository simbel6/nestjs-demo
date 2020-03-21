import { NestFactory,Reflector } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
  );
  await app.listen(3008);
}
bootstrap();
