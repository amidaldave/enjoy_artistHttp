import { AdminEntity } from 'nestjs-admin'
import { PeintureEntity } from '../entities/peinture.entity';


export class PeintureAdmin extends AdminEntity {
  entity = PeintureEntity;
  listDisplay = ['peintureId', 'peintureName', 'dateCreation'];
  searchFields = ['peintureId', 'peintureName', 'dateCreation'];
}