import { AdminEntity } from 'nestjs-admin'
import { ArtisteEntity } from '../entities/artist.entity';


export class ArtistAdmin extends AdminEntity {
  entity = ArtisteEntity;
  listDisplay = ['artisteId', 'artisteFirstname', 'artisteLastname','artisteMiddlename','artisteSexe','artisteDob','artisteLieuN','artisteMail','artistePhoto','artistePhone','artisteBio'];
  searchFields = ['artisteId', 'artisteFirstname', 'artisteLastname','artisteMiddlename','artisteSexe','artisteDob','artisteLieuN','artisteMail','artistePhoto','artistePhone','artisteBio'];
}