import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from '../backoffice/backoffice.module';
import { DefaultAdminSite } from 'nestjs-admin';
import { UserAdmin } from '../admin/user.admin';
import { ALbumAdmin } from '../admin/album.admin';
import { ArtistAdmin } from '../admin/artist.admin';
import { BandAdmin } from '../admin/band.admin';
import { BookAdmin } from '../admin/book.admin';
import { BookCategoryAdmin } from '../admin/bookcategory.admin';
import { EditionAdmin } from '../admin/edition.admin';
import { MovieAdmin } from '../admin/movie.admin';
import { MusicGenreAdmin } from '../admin/musicgenre.admin';
import { PeintureAdmin } from '../admin/peinture.admin';
import { ProfessionAdmin } from '../admin/profession.admin';
import { ScultureAdmin } from '../admin/sculture.admin';
import { SongAdmin } from '../admin/song.admin';
import { SocialAdmin } from '../admin/social.admin';
import { ArticleAdmin } from '../admin/article.admin';
import { LabelAdmin } from '../admin/label.admin';
import { RedactionAdmin } from '../admin/redaction.admin';
import { TagAdmin } from '../admin/tag.admin';
import { User } from '../entities/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User]),BackofficeModule],
    controllers:[],
    providers:[]

})
export class UserModule {

    constructor(private readonly adminSite: DefaultAdminSite){
        adminSite.register('User', UserAdmin);
        adminSite.register('Album',ALbumAdmin);
        adminSite.register('Artist', ArtistAdmin);
        adminSite.register('Band',BandAdmin);
        adminSite.register('Book', BookAdmin);
        adminSite.register('Book Category',BookCategoryAdmin);
        adminSite.register('Edition', EditionAdmin);
        adminSite.register('Movie',MovieAdmin);
        adminSite.register('Music Genre', MusicGenreAdmin);
        adminSite.register('Peinture',PeintureAdmin);
        adminSite.register('Profession', ProfessionAdmin);
        adminSite.register('Sculture',ScultureAdmin);
        adminSite.register('Social', SocialAdmin);
        adminSite.register('Song',SongAdmin);
        /* adminSite.register('Article', ArticleAdmin);
        adminSite.register('Label',LabelAdmin);
        adminSite.register('Redaction', RedactionAdmin);
        adminSite.register('Tag',TagAdmin); */
    }
}
