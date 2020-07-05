import { AdminEntity } from 'nestjs-admin';
import { ArticleEntity } from '../articleEntities/article.entity';


export class ArticleAdmin extends AdminEntity {
  entity = ArticleEntity;
  listDisplay = ['idArticle', 'articleTitle', 'articleHeadLine','articleSection','articleText'];
  searchFields = ['idArticle', 'articleTitle', 'articleHeadLine','articleSection','articleText'];
}