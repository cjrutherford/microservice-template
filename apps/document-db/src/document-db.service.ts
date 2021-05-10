import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentDbService {
  getHello(): string {
    return 'Hello World!';
  }
}
