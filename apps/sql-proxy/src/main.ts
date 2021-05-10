import { NestFactory } from '@nestjs/core';
import { SqlProxyModule } from './sql-proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(SqlProxyModule);
  await app.listen(3000);
}
bootstrap();
