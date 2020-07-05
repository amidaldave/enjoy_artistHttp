import { Module } from '@nestjs/common';
import { ScultureController } from './sculture.controller';

@Module({
  controllers: [ScultureController]
})
export class ScultureModule {}
