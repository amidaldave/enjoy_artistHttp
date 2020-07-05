import { AdminEntity } from 'nestjs-admin'
import { ScultureEntity } from '../entities/sculture.entity';


export class ScultureAdmin extends AdminEntity {
  entity = ScultureEntity;
  listDisplay = ['scultureId', 'scultureName', 'dateCreation'];
  searchFields = ['scultureId', 'scultureName', 'dateCreation'];
}