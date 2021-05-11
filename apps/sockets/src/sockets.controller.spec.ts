import { Test, TestingModule } from '@nestjs/testing';
import { SocketsController } from './sockets.controller';
import { SocketsService } from './sockets.service';

describe('SocketsController', () => {
  let socketsController: SocketsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocketsController],
      providers: [SocketsService],
    }).compile();

    socketsController = app.get<SocketsController>(SocketsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(socketsController.getHello()).toBe('Hello World!');
    });
  });
});
