import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ArtisteEntity } from "./artist.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('enjoy_profession')
export class ProfessionEntity{
  
    @PrimaryGeneratedColumn({name:'profession_id',type:'int'})
    @ApiProperty()
    professionId: number;

    @Column({name:'profession_title', length:50})
    @ApiProperty()
    professionTitle: string;

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

    @ManyToMany(type => ArtisteEntity, artiste => artiste.professions)
    @JoinTable({name:'enjoy_artistes_professions'})
    artistes: ArtisteEntity[];

}