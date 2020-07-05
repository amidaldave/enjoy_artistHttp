import { AdminEntity } from 'nestjs-admin'
import { EditionEntity } from '../entities/edition.entity';


export class EditionAdmin extends AdminEntity {
  entity = EditionEntity;
  listDisplay = ['editionId', 'editionName', 'editionDetail'];
  searchFields = ['editionId', 'editionName', 'editionDetail'];
}