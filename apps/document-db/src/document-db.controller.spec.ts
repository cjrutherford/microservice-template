import { Test, TestingModule } from '@nestjs/testing';
import { DocumentDbController } from './document-db.controller';
import { DocumentDbService } from './document-db.service';

describe('DocumentDbController', () => {
  let documentDbController: DocumentDbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DocumentDbController],
      providers: [DocumentDbService],
    }).compile();

    documentDbController = app.get<DocumentDbController>(DocumentDbController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(documentDbController.getHello()).toBe('Hello World!');
    });
  });
});
