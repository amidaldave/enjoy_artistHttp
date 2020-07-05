import { ApiProperty } from "@nestjs/swagger";

export class ScultureDto{
    
    @ApiProperty() 
    scultureName: string;

    @ApiProperty()
    dateCreation: Date;
}