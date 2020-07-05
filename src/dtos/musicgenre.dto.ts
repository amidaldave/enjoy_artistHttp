import { ApiProperty } from "@nestjs/swagger";

export class MusicGenreDto{
    
    @ApiProperty() 
    musicGenre: string;

    @ApiProperty()
    musicGenreDetail: string;
}