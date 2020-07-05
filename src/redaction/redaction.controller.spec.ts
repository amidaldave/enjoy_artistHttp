import { Test, TestingModule } from '@nestjs/testing';
import { RedactionController } from './redaction.controller';

describe('Redaction Controller', () => {
  let controller: RedactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedactionController],
    }).compile();

    controller = module.get<RedactionController>(RedactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
