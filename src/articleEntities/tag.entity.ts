import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:'enjoy_tag'})
export class TagEntity {
  
    @PrimaryGeneratedColumn({name:'tag_id'})
    @ApiProperty()
    idTag: number;

    @Column({name:'tag_name', length:100})
    @ApiProperty()
    tagName: string;

    @Column({name:'tag_description', length:255})
    @ApiProperty()
    tagDescription: string;

    @ManyToMany(type => ArticleEntity, articleEntity => articleEntity.tags)
    @JoinTable({name:'enjoy_article_tag'})
    articleTags: ArticleEntity[];

}