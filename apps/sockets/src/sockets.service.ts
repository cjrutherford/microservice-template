import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketsService {
  getHello(): string {
    return 'Hello World!';
  }
}
