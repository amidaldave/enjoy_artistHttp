import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ArtisteEntity } from "./artist.entity";

@Entity('enjoy_movies')
export class MovieEntity{

    @PrimaryGeneratedColumn({name:'movie_id'})
    movieId: number;

    @Column({name:'movie_title', length: 100})
    movieTitle: string;

    @Column({name:'movie_url', length: 100})
    movieUrl?: string;

    @Column({name:'movie_year', type: Date})
    movieYear?: Date;

    @Column({name:'movie_type', length: 20})
    movieType?: string;

    @Column({name:'movie_image',length: 100})
    movieImage: string;

    @Column({name:'data_type', length: 20})
    dataType: string;

    @Column({name:'data_videoId',length: 100})
    dataVideoId: string;


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
    
    @ManyToMany(type => ArtisteEntity, artiste => artiste.movies)
    @JoinTable({name:'enjoy_artist_movies'})
    artistMovies: ArtisteEntity[];
}