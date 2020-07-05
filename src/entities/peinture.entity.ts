import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ArtisteEntity } from "./artist.entity";

@Entity('enjoy_peinture')
export class PeintureEntity{
    
@PrimaryGeneratedColumn({name:'peinture_id'})
    @ApiProperty()
    peintureId: number;

    @Column({name:'peinture_Name', length:100})
    @ApiProperty()
    peintureName: string;

    @Column({name:'date_creation'})
    @ApiProperty()
    dateCreation: Date;

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

    @ManyToMany(type => ArtisteEntity, artiste => artiste.peintures)
    @JoinTable({name:'enjoy_artistes_peintures'})
    artistePeintures: ArtisteEntity[];

}