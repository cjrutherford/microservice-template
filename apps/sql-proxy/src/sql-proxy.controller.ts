import { Controller, Get } from '@nestjs/common';
import { SqlProxyService } from './sql-proxy.service';

@Controller()
export class SqlProxyController {
  constructor(private readonly sqlProxyService: SqlProxyService) {}

  @Get()
  getHello(): string {
    return this.sqlProxyService.getHello();
  }
}
