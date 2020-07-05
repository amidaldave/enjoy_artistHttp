import { AdminEntity } from 'nestjs-admin'
import { BookEntity } from '../entities/book.entity';

export class BookAdmin extends AdminEntity {
  entity = BookEntity;
  listDisplay = ['bookId', 'bookTitle', 'bookDate','bookIsbn'];
  searchFields = ['bookId', 'bookTitle', 'bookDate','bookIsbn'];
}