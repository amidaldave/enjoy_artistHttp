import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from "typeorm";
import { ArticleEntity } from "./article.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'enjoy_redaction'})
export class RedactionEntity {

    @PrimaryGeneratedColumn({name:'author_id'})
    @ApiProperty()
    idAuthor: number;

    @Column({name:'author_first_name', length: 100})
    @ApiProperty()
    authorFirstName: string;

    @Column({name:'author_last_name', length: 100})
    @ApiProperty()
    authorLastName: string;

    @Column({name:'author_middle_name', length: 100})
    @ApiProperty()
    authorMiddleName?: string;

    @Column({name:'author_dob', type: Date})
    @ApiProperty()
    authorDod: Date;

    @Column({name:'author_commune', length:100})
    @ApiProperty()
    authorPob: string;

    @Column({name:'author_sexe', length:10})
    @ApiProperty()
    authorSexe: string;

    @Column({name:'author_phone_mobile', length:20})
    @ApiProperty()
    authorPhoneMobile?: string;

    @Column({name:'author_phone_work', length:20})
    @ApiProperty()
    authorPhoneWork?: string;

    @Column({name:'author_mail', length:50})
    @ApiProperty()
    authorMail?: string;

    @Column({name:'author_adress', length:100})
    @ApiProperty()
    authorAdress?: string;

    @Column({name:'author_photo', length:100})
    @ApiProperty()
    authorPhoto?: string;

    @Column({name:'author_category', length:20})
    @ApiProperty()
    authorCategory?: string;

    @Column({name:'create_by',length: 20})
    createBy: string;

    @CreateDateColumn({name:'create_date'})
    createDate: Date;

    @Column({name:'update_by',length: 20})
    updateBy: string;

    @UpdateDateColumn({name:'update_date'})
    updateDate: Date;

    @OneToMany(type => ArticleEntity, articleEntity => articleEntity.author)
    authorArticles: ArticleEntity[];


}