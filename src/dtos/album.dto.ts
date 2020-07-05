import { ApiProperty } from "@nestjs/swagger";

export class AlbumDto{
    
    @ApiProperty() 
    albumTitle: string;

    @ApiProperty()
    albumDate: Date;
    
    @ApiProperty()
    albumUrl: string;

    @ApiProperty()
    albumCover: string;
}