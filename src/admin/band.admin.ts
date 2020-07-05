import { AdminEntity } from 'nestjs-admin'
import { BandEntity } from '../entities/band.entity';


export class BandAdmin extends AdminEntity {
  entity = BandEntity;
  listDisplay = ['bandId', 'bandName', 'bandCreateDate','bandPhoneMobile','bandPhone','bandEmail','bandWebsite'];
  searchFields = ['bandId', 'bandName', 'bandCreateDate','bandPhoneMobile','bandPhone','bandEmail','bandWebsite'];
}