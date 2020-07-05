import { Test, TestingModule } from '@nestjs/testing';
import { MusicgenreController } from './musicgenre.controller';

describe('Musicgenre Controller', () => {
  let controller: MusicgenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicgenreController],
    }).compile();

    controller = module.get<MusicgenreController>(MusicgenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
