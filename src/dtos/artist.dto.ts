import { ApiProperty } from "@nestjs/swagger";

export class ArtisteDto {
    @ApiProperty()
    artisteFirstname: string;

    @ApiProperty()
    artisteLastname: string;

    @ApiProperty()
    artisteMiddlename?: string;

    @ApiProperty()
    artisteSexe: string;                   
    
    @ApiProperty()
    artisteDob?: Date;
    
    @ApiProperty()
    artisteLieuN?: string;
   
    @ApiProperty()
    artisteMail?: string;
    
    @ApiProperty()
    artistePhoto?: string;
    
    @ApiProperty()
    artistePhone?: string;
    
    @ApiProperty()
    artisteBio?: string;
}