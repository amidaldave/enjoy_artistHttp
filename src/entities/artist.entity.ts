import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ProfessionEntity } from './profession.entity';
import { SocialEntity } from './social.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SongEntity } from './song.entity';
import { AlbumEntity } from './album.entity';
import { BandEntity } from './band.entity';
import { BookEntity } from './book.entity';
import { MovieEntity } from './movie.entity';
import { PeintureEntity } from './peinture.entity';
import { ScultureEntity } from './sculture.entity';

@Entity('enjoy_artiste')
export class ArtisteEntity{
    
    @PrimaryGeneratedColumn({name:'artiste_id', type:'int'})
    @ApiProperty()
    artisteId: number;

    @Column({name:'artiste_first_name', length: 100 })
    @ApiProperty()
    artisteFirstname: string;

    @Column({name:'artiste_last_name', length: 100 })
    @ApiProperty()
    artisteLastname: string;

    @Column({name:'artiste_middle_name', length: 100 })
    @ApiProperty()
    artisteMiddlename?: string;
    
    @Column({name:'artiste_sexe', length: 10})
    @ApiProperty()
    artisteSexe: string;

    @Column({name:'artiste_dob',type:Date})
    @ApiProperty()
    artisteDob?: Date;

    @Column({name:'artiste_ldn', length:50})
    @ApiProperty()
    artisteLieuN?: string;

    @Column({name:'artiste_email', length:50})
    @ApiProperty()
    artisteMail?: string;

    @Column({name:'artiste_photo'})
    @ApiProperty()
    artistePhoto?: string;

    @Column({name:'artiste_phone', length:20})
    @ApiProperty()
    artistePhone?: string;

    @Column({name:'artiste_biography'})
    @ApiProperty()
    artisteBio?: string;

    @CreateDateColumn({name:'create_date'})
    @ApiProperty()
    createDate: Date;

    @Column({name:'create_by', length:20})
    @ApiProperty()
    createBy: string;

    @UpdateDateColumn({name:'update_date'})
    @ApiProperty()
    updateDate: Date;

    @Column({name:'update_by', length:20})
    @ApiProperty()
    updateBy: string;

    @ManyToMany(type => ProfessionEntity, profession => profession.artistes)
    professions: ProfessionEntity[];

    @ManyToMany(type => SocialEntity, social => social.artisteSocials)
    socials: SocialEntity[];

    @ManyToMany(type => SongEntity, song => song.artisteSongs)
    songs: SongEntity[];

    @ManyToMany(type => AlbumEntity, album => album.artisteAlbums)
    albums: AlbumEntity[];

    @ManyToMany(type => BandEntity, band => band.artisteBands)
    bands: BandEntity[];

    @ManyToMany(type => BookEntity, book => book.artisteBooks)
    books: BookEntity[];

    @ManyToMany(type => MovieEntity, movie => movie.artistMovies)
    movies: MovieEntity[];

    @ManyToMany(type => PeintureEntity, peinture => peinture.artistePeintures)
    peintures: PeintureEntity[];

    @ManyToMany(type => ScultureEntity, sculture => sculture.artisteScultures)
    scultures: PeintureEntity[];

}