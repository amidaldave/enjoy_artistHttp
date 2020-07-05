import { ApiProperty } from "@nestjs/swagger";

export class SongDto{
    
    @ApiProperty()
    songTitle: string;
    
}