import { Module } from '@nestjs/common';
import { EditionController } from './edition.controller';

@Module({
  controllers: [EditionController]
})
export class EditionModule {}
