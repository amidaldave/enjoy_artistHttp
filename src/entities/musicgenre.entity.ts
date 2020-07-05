import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { AlbumEntity } from './album.entity';

@Entity('enjoy_music_genre')
export class MusicGenreEntity{

    @PrimaryGeneratedColumn({name:'music_genre_id', type:'int'})
    @ApiProperty()
    musicGenreId: number;

    @Column({name:'music_genre', length: 50 })
    @ApiProperty()
    musicGenre: string; 

    @Column({name:'music_genre_details', length: 100 })
    @ApiProperty()
    musicGenreDetail: string;

    @OneToMany(type => AlbumEntity, album => album.musicgenre)
    albums: AlbumEntity[]

}