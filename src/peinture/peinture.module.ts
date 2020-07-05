import { Module } from '@nestjs/common';
import { PeintureController } from './peinture.controller';

@Module({
  controllers: [PeintureController]
})
export class PeintureModule {}
