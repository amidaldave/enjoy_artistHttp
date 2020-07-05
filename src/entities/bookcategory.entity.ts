import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "./book.entity";

@Entity('enjoy_book_category')
export class BookCategoryEntity{
  
    @PrimaryGeneratedColumn({name:'book_category_id',type:'int'})
    @ApiProperty()
    bookCategoryId: number;

    @Column({name:'book_category', length:50})
    @ApiProperty()
    bookCategory: string;

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

    @OneToMany(type => BookEntity, book => book.category)    
    books: BookEntity[];

}