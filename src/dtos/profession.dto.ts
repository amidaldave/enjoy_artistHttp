import { ApiProperty } from "@nestjs/swagger";

export class ProfessionDto{
    
    @ApiProperty()
    professionTitle: string;
    
}