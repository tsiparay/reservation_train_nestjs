import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module'

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  Logger.log(`http://localhost:${port}/graphql`);
}
bootstrap();
