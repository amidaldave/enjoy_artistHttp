import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ArtisteEntity } from "./artist.entity";

@Entity('enjoy_sculture')
export class ScultureEntity{
    
@PrimaryGeneratedColumn({name:'sculture_id'})
    @ApiProperty()
    scultureId: number;

    @Column({name:'sculture_Name', length:100})
    @ApiProperty()
    scultureName: string;

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

    @ManyToMany(type => ArtisteEntity, artiste => artiste.scultures)
    @JoinTable({name:'enjoy_artistes_scultures'})
    artisteScultures: ArtisteEntity[];

}