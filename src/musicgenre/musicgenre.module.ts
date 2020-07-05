import { Module } from '@nestjs/common';
import { MusicgenreController } from './musicgenre.controller';

@Module({
  controllers: [MusicgenreController]
})
export class MusicgenreModule {}
