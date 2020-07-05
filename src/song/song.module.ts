import { Module } from '@nestjs/common';
import { SongController } from './song.controller';

@Module({
  controllers: [SongController]
})
export class SongModule {}
