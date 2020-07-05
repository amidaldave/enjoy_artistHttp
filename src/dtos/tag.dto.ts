import { ApiProperty } from "@nestjs/swagger";

export class TagDto {
  
    @ApiProperty()
    tagName: string;

    @ApiProperty()
    tagDescription: string;

}