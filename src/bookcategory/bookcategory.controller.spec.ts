import { Test, TestingModule } from '@nestjs/testing';
import { BookcategoryController } from './bookcategory.controller';

describe('Bookcategory Controller', () => {
  let controller: BookcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookcategoryController],
    }).compile();

    controller = module.get<BookcategoryController>(BookcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
