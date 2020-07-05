import { ApiProperty } from "@nestjs/swagger";

export class PeintureDto{
    
    @ApiProperty() 
    peintureName: string;

    @ApiProperty()
    dateCreation: Date;
}