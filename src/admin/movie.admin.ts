import { AdminEntity } from 'nestjs-admin'
import { MovieEntity } from '../entities/movie.entity';


export class MovieAdmin extends AdminEntity {
  entity = MovieEntity;
  listDisplay = ['movieId', 'movieTitle', 'movieUrl','movieYear','movieType'];
  searchFields = ['movieId', 'movieTitle', 'movieUrl','movieYear','movieType'];
}