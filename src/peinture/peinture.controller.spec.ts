import { Test, TestingModule } from '@nestjs/testing';
import { PeintureController } from './peinture.controller';

describe('Peinture Controller', () => {
  let controller: PeintureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeintureController],
    }).compile();

    controller = module.get<PeintureController>(PeintureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
