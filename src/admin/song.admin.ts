import { AdminEntity } from 'nestjs-admin'
import { SongEntity } from '../entities/song.entity';


export class SongAdmin extends AdminEntity {
  entity = SongEntity;
  listDisplay = ['songId', 'songTitle'];
  searchFields = ['songId', 'songTitle'];
}