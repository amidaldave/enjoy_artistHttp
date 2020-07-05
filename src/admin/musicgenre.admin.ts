import { AdminEntity } from 'nestjs-admin';
import { MusicGenreEntity } from '../entities/musicgenre.entity';


export class MusicGenreAdmin extends AdminEntity {
  entity = MusicGenreEntity;
  listDisplay = ['musicGenreId', 'musicGenre', 'musicGenreDetail'];
  searchFields = ['musicGenreId', 'musicGenre', 'musicGenreDetail'];
}