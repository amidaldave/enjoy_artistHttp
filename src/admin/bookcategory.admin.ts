import { AdminEntity } from 'nestjs-admin'
import { BookCategoryEntity } from '../entities/bookcategory.entity';


export class BookCategoryAdmin extends AdminEntity {
  entity = BookCategoryEntity;
  listDisplay = ['bookCategoryId', 'bookCategory'];
  searchFields = ['bookCategoryId', 'bookCategory'];
}