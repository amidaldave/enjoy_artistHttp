import { ApiProperty } from "@nestjs/swagger";

export class ArtistEventDto{
    
    @ApiProperty()
    artisteId: number;

    @ApiProperty()
    eventId: number;
    
}