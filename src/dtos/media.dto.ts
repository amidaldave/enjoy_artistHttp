import { ApiProperty } from "@nestjs/swagger";

export class MediaDto{
    
    @ApiProperty()
    photo: string;

    @ApiProperty()
    photoDetails: string;
  
}