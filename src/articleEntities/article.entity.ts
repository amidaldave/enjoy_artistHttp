import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { type } from "os";
import { TagEntity } from "./tag.entity";
import { LabelEntity } from "./label.entity";
import { RedactionEntity } from "./redaction.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:'enjoy_article'})
export class ArticleEntity{

    @PrimaryGeneratedColumn({name:'article_id'})
    @ApiProperty()
    idArticle: number;

    @Column({name:'article_title', length:250})
    @ApiProperty()
    articleTitle: string;

    @Column({name:'article_head_line', length:250})
    @ApiProperty()
    articleHeadLine: string;

    @Column({name:'article_section', type:'text'})
    @ApiProperty()
    articleSection: string;

    @Column({name:'article_text',type:'text'})
    @ApiProperty()
    articleText: string;

    @Column({name:'create_by',length: 20})
    @ApiProperty()
    createBy: string;

    @CreateDateColumn({name:'create_date'})
    @ApiProperty()
    createDate: Date;

    @Column({name:'update_by',length: 20})
    @ApiProperty()
    updateBy: string;

    @UpdateDateColumn({name:'update_date'})
    @ApiProperty()
    updateDate: Date;

    @ManyToMany(type => TagEntity, tagEntity =>tagEntity.articleTags)
    tags: TagEntity[];

    @ManyToMany(type => LabelEntity, labelEntity => labelEntity.articleLabels)
    labels: LabelEntity[];

    @ManyToOne(type => RedactionEntity, redactionEntity => redactionEntity.authorArticles)
    author: RedactionEntity;
}