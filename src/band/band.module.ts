import { Module } from '@nestjs/common';
import { BandController } from './band.controller';

@Module({
  controllers: [BandController]
})
export class BandModule {}
