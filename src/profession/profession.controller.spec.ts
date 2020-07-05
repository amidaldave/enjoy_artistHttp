import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionController } from './profession.controller';

describe('Profession Controller', () => {
  let controller: ProfessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionController],
    }).compile();

    controller = module.get<ProfessionController>(ProfessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
