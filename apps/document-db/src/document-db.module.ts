import { Module } from '@nestjs/common';
import { DocumentDbController } from './document-db.controller';
import { DocumentDbService } from './document-db.service';

@Module({
  imports: [],
  controllers: [DocumentDbController],
  providers: [DocumentDbService],
})
export class DocumentDbModule {}
