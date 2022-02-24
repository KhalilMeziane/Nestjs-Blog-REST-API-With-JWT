import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const config = new ConfigService()
  const port = config.get('PORT')
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
