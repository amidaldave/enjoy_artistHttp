import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController]
})
export class AlbumModule {}
