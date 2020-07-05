import { ApiProperty } from "@nestjs/swagger";

export class LabelDto {
      
    @ApiProperty()
    labelTitle: string;
   
    @ApiProperty()
    labelDescription: string;

}