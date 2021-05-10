import { Test, TestingModule } from '@nestjs/testing';
import { SqlProxyController } from './sql-proxy.controller';
import { SqlProxyService } from './sql-proxy.service';

describe('SqlProxyController', () => {
  let sqlProxyController: SqlProxyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SqlProxyController],
      providers: [SqlProxyService],
    }).compile();

    sqlProxyController = app.get<SqlProxyController>(SqlProxyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sqlProxyController.getHello()).toBe('Hello World!');
    });
  });
});
