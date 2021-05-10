import { Controller, Get } from '@nestjs/common';
import { DocumentDbService } from './document-db.service';

@Controller()
export class DocumentDbController {
  constructor(private readonly documentDbService: DocumentDbService) {}

  @Get()
  getHello(): string {
    return this.documentDbService.getHello();
  }
}
