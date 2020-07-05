import { ApiProperty } from "@nestjs/swagger";

export class EditionDto{
    
    @ApiProperty()
    editionName: string; 

    @ApiProperty()
    editionDetail: string;
    
}