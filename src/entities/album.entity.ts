import {} from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { ArtisteEntity } from "./artist.entity";
import { ApiProperty } from '@nestjs/swagger';
import { MusicGenreEntity } from './musicgenre.entity';
import { type } from 'os';
import { SongEntity } from './song.entity';
import { BandEntity } from './band.entity';

@Entity('enjoy_album')
export class AlbumEntity{
   
    @PrimaryGeneratedColumn({name:'album_id'})
    @ApiProperty()
    albumId: number;

    @Column({name:'album_title', length:100})
    @ApiProperty()
    albumTitle: string;

    @Column({name: 'album_release_date', type: Date})
    @ApiProperty()
    albumDate: Date;

    @Column({name:'album_url',length:100})
    @ApiProperty()
    albumUrl: string;

    @Column({name:'album_cover',length:100})
    @ApiProperty()
    albumCover: string;

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

    @ManyToOne(type => MusicGenreEntity, musicgenre => musicgenre.albums)
    musicgenre: MusicGenreEntity;

    @OneToMany(type => SongEntity, song => song.albumSong)
    songsAlbum: SongEntity[];

    @ManyToMany(type => ArtisteEntity, artiste => artiste.albums)
    @JoinTable({name:'enjoy_album_artistes'})    
    artisteAlbums: ArtisteEntity[];

    @ManyToMany(type => BandEntity, band => band.albumBands)
    @JoinTable({name:'enjoy_band_album'})    
    bandAlbums: BandEntity[];
}