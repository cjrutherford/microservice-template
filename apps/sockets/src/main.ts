import { NestFactory } from '@nestjs/core';
import { SocketsModule } from './sockets.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketsModule);
  await app.listen(3000);
}
bootstrap();
