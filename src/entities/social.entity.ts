import {} from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ArtisteEntity } from "./artist.entity";
import { ApiProperty } from '@nestjs/swagger';
import { BandEntity } from './band.entity';

@Entity('enjoy_social')
export class SocialEntity{
   
    @PrimaryGeneratedColumn({name:'social_id'})
    @ApiProperty()
    socialId: number;

    @Column({name:'social_network', length:100})
    @ApiProperty()
    socialNetwork: string;

    @Column({name:'social_user',length:100})
    @ApiProperty()
    socialUser: string;

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

    @ManyToMany(type => ArtisteEntity, artiste => artiste.socials)
    @JoinTable({name:'enjoy_artistes_socials'})
    artisteSocials: ArtisteEntity[];

    @ManyToMany(type => BandEntity, band => band.socialBands)
    @JoinTable({name:'enjoy_band_social'})
    bandSocials: BandEntity[];
}