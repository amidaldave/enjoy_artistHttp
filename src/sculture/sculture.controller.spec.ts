import { Test, TestingModule } from '@nestjs/testing';
import { ScultureController } from './sculture.controller';

describe('Sculture Controller', () => {
  let controller: ScultureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScultureController],
    }).compile();

    controller = module.get<ScultureController>(ScultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
