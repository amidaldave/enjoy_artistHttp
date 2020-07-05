import { AdminEntity } from 'nestjs-admin'
import { LabelEntity } from '../articleEntities/label.entity';


export class LabelAdmin extends AdminEntity {
  entity = LabelEntity;
  listDisplay = ['idLabel', 'labelTitle', 'labelDescription'];
  searchFields = ['idLabel', 'labelTitle', 'labelDescription'];
}