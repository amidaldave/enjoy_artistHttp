import { ApiProperty } from "@nestjs/swagger";

export class ArtistFestivalDto{
    
    @ApiProperty()
    artisteId: number;

    @ApiProperty()
    festivalId: number;
    
}