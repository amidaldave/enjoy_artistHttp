import { AdminEntity } from 'nestjs-admin'
import { TagEntity } from '../articleEntities/tag.entity';


export class TagAdmin extends AdminEntity {
  entity = TagEntity;
  listDisplay = ['idTag', 'tagName', 'tagDescription'];
  searchFields = ['idTag', 'tagName', 'tagDescription'];
}