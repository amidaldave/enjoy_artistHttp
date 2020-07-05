import { AdminEntity } from 'nestjs-admin'
import { ProfessionEntity } from '../entities/profession.entity';


export class ProfessionAdmin extends AdminEntity {
  entity = ProfessionEntity;
  listDisplay = ['professionId', 'professionTitle'];
  searchFields = ['professionId', 'professionTitle'];
}