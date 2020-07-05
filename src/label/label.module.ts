import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';

@Module({
  controllers: [LabelController]
})
export class LabelModule {}
