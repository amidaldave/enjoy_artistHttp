import { Test, TestingModule } from '@nestjs/testing';
import { EditionController } from './edition.controller';

describe('Edition Controller', () => {
  let controller: EditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditionController],
    }).compile();

    controller = module.get<EditionController>(EditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
