import { AdminEntity } from 'nestjs-admin'
import { RedactionEntity } from '../articleEntities/redaction.entity';


export class RedactionAdmin extends AdminEntity {
  entity = RedactionEntity;
  listDisplay = ['idAuthor', 'authorFirstName', 'authorLastName','authorMiddleName','authorDod','authorPob','authorSexe','authorPhoneMobile','authorPhoneWork','authorMail','authorAdress','authorPhoto','authorCategory'];
  searchFields = ['idAuthor', 'authorFirstName', 'authorLastName','authorMiddleName','authorDod','authorPob','authorSexe','authorPhoneMobile','authorPhoneWork','authorMail','authorAdress','authorPhoto','authorCategory'];
}