import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ArtisteEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';

@Entity('enjoy_songs')
export class SongEntity{

    @PrimaryGeneratedColumn({name:'song_id', type:'int'})
    @ApiProperty()
    songId: number;

    @Column({name:'song_title', length: 100 })
    @ApiProperty()
    songTitle: string; 

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

    @ManyToMany(type => ArtisteEntity, artiste => artiste.songs)
    @JoinTable({name:'enjoy_artistes_songs'})
    artisteSongs: ArtisteEntity[];

    @ManyToOne(type => AlbumEntity, album => album.songsAlbum)
    albumSong: AlbumEntity;
}