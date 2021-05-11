import { Controller, Get } from '@nestjs/common';
import { SocketsService } from './sockets.service';

@Controller()
export class SocketsController {
  constructor(private readonly socketsService: SocketsService) {}

  @Get()
  getHello(): string {
    return this.socketsService.getHello();
  }
}
