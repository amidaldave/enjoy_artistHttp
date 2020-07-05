import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artist/artist.module';
import { ProfessionModule } from './profession/profession.module';
import { SocialModule } from './social/social.module';
import { MediaModule } from './media/media.module';
import { BandModule } from './band/band.module';
import { AlbumModule } from './album/album.module';
import { BookModule } from './book/book.module';
import { BookcategoryModule } from './bookcategory/bookcategory.module';
import { EditionModule } from './edition/edition.module';
import { MusicgenreModule } from './musicgenre/musicgenre.module';
import { SongModule } from './song/song.module';
import { TagModule } from './tag/tag.module';
import { LabelModule } from './label/label.module';
import { RedactionModule } from './redaction/redaction.module';
import { ArticleModule } from './article/article.module';
import { MovieModule } from './movie/movie.module';
import { PeintureModule } from './peinture/peinture.module';
import { ScultureModule } from './sculture/sculture.module';
import { UserModule } from './user/user.module';
import { BackofficeModule } from './backoffice/backoffice.module'
import { User } from './entities/user.entity';

@Module({
  imports: [ArtistModule,
    TypeOrmModule.forRoot(),
    ProfessionModule,
    SocialModule,
    MediaModule,
    BandModule,
    AlbumModule,
    BookModule,
    BookcategoryModule,
    EditionModule,
    MusicgenreModule,
    SongModule,
    TagModule,
    LabelModule,
    RedactionModule,
    ArticleModule,
    MovieModule,
    PeintureModule,
    ScultureModule,
    UserModule,
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
