import { AdminEntity } from 'nestjs-admin'
import { SocialEntity } from '../entities/social.entity';


export class SocialAdmin extends AdminEntity {
  entity = SocialEntity;
  listDisplay = ['socialId', 'socialNetwork', 'socialUser'];
  searchFields = ['socialId', 'socialNetwork', 'socialUser'];
}