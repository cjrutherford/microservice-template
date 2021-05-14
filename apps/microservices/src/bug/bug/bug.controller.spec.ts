import { Test, TestingModule } from '@nestjs/testing';
import { BugController } from './bug.controller';

describe('BugController', () => {
  let controller: BugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugController],
    }).compile();

    controller = module.get<BugController>(BugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
