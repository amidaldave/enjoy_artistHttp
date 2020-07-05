import { Module } from '@nestjs/common';
import { BookcategoryController } from './bookcategory.controller';

@Module({
  controllers: [BookcategoryController]
})
export class BookcategoryModule {}
