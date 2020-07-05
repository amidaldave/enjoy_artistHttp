import { ApiProperty } from "@nestjs/swagger";

export class ArtisteMediaDto{
    
    @ApiProperty()
    photoId: number;

    @ApiProperty()
    artisteId: number;
    
}