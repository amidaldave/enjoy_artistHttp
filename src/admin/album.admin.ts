import { AdminEntity } from 'nestjs-admin'
import { AlbumEntity } from '../entities/album.entity';


export class ALbumAdmin extends AdminEntity {
  entity = AlbumEntity;
  listDisplay = ['albumId', 'albumTitle', 'albumDate','albumUrl'];
  searchFields = ['albumId', 'albumTitle', 'albumDate','albumUrl'];
}