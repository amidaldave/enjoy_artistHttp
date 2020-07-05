import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@Entity('enjoy_edition')
export class EditionEntity{

    @PrimaryGeneratedColumn({name:'edition_id', type:'int'})
    @ApiProperty()
    editionId: number;

    @Column({name:'edition_name', length: 100 })
    @ApiProperty()
    editionName: string; 

    @Column({name:'edition_details', length: 200 })
    @ApiProperty()
    editionDetail: string;

    @ManyToMany(type => BookEntity, book => book.editionBooks)
    @JoinTable({name:'enjoy_book_edition'}) 
    bookEditions: BookEntity[];

}