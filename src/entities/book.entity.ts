import {} from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ArtisteEntity } from "./artist.entity";
import { ApiProperty } from '@nestjs/swagger';
import { EditionEntity } from './edition.entity';
import { BookCategoryEntity } from './bookcategory.entity';

@Entity('enjoy_book')
export class BookEntity{
   
    @PrimaryGeneratedColumn({name:'book_id'})
    @ApiProperty()
    bookId: number;

    @Column({name:'book_title', length:100})
    @ApiProperty()
    bookTitle: string;

    @Column({name: 'book_release_date', type: Date})
    @ApiProperty()
    bookDate: Date;

    @Column({name:'book_isbn',length:50})
    @ApiProperty()
    bookIsbn: string;

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

    @ManyToMany(type => EditionEntity, edition => edition.bookEditions)
    editionBooks: EditionEntity[];

    @ManyToOne(type => BookCategoryEntity, category => category.books)
    category: BookCategoryEntity;

    @ManyToMany(type => ArtisteEntity, artiste => artiste.books)
    @JoinTable({name:'enjoy_artistes_book'})    
    artisteBooks: ArtisteEntity[];

}