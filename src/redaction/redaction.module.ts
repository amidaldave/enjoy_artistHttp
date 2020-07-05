import { Module } from '@nestjs/common';
import { RedactionController } from './redaction.controller';

@Module({
  controllers: [RedactionController]
})
export class RedactionModule {}
