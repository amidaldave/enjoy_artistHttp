import { ApiProperty } from "@nestjs/swagger";

export class MovieDto{
    
    @ApiProperty() 
    movieId: number;

    @ApiProperty()
    movieTitle: string;

    @ApiProperty()
    movieUrl?: string;

    @ApiProperty()
    movieYear?: Date;

    @ApiProperty()
    movieType?: string;

    @ApiProperty()
    movieImage: string;

    @ApiProperty()
    dataType: string;

    @ApiProperty()
    dataVideoId: string;
}