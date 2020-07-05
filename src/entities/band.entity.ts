import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { SocialEntity } from './social.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from './album.entity';
import { ArtisteEntity } from './artist.entity';

@Entity('enjoy_band')
export class BandEntity{
    
    @PrimaryGeneratedColumn({name:'band_id', type:'int'})
    @ApiProperty()
    bandId: number;

    @Column({name:'band_name', length: 100 })
    @ApiProperty()
    bandName: string;

    @Column({name:'band_create_date',type:Date})
    @ApiProperty()
    bandCreateDate: Date;

    @Column({name:'band_phone_mobile', length: 20 })
    @ApiProperty()
    bandPhoneMobile: string;

    @Column({name:'band_phone', length: 20 })
    @ApiProperty()
    bandPhone: string;
    
    @Column({name:'band_email', length: 50})
    @ApiProperty()
    bandEmail: string;

    @Column({name:'band_website_url', length:50})
    @ApiProperty()
    bandWebsite: string;

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

    @ManyToMany(type => AlbumEntity, album => album.bandAlbums)
    albumBands: AlbumEntity[];

    @ManyToMany(type => SocialEntity, social => social.bandSocials)
    socialBands: SocialEntity[];

    @ManyToMany(type => ArtisteEntity, artiste => artiste.bands)
    @JoinTable({name:'enjoy_artistes_band'})
    artisteBands: ArtisteEntity[];
    
}