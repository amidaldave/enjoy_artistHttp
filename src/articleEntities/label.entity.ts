import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:'enjoy_label'})
export class LabelEntity {
  
    @PrimaryGeneratedColumn({name:'label_id'})
    @ApiProperty()
    idLabel: number;

    @Column({name:'label_title', length:100})
    @ApiProperty()
    labelTitle: string;

    @Column({name:'label_description', length:200})
    @ApiProperty()
    labelDescription: string;

    @ManyToMany(type =>ArticleEntity, articleEntity => articleEntity.labels)
    @JoinTable({name:'enjoy_article_label'})
    articleLabels: ArticleEntity[];

}