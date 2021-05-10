import { NestFactory } from '@nestjs/core';
import { DocumentDbModule } from './document-db.module';

async function bootstrap() {
  const app = await NestFactory.create(DocumentDbModule);
  await app.listen(3000);
}
bootstrap();
