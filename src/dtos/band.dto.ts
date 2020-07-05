import { ApiProperty } from "@nestjs/swagger";

export class BandDto{
    
    @ApiProperty()
    bandName: string;
    
    @ApiProperty()
    bandCreateDate: Date;
    
    @ApiProperty()
    bandPhoneMobile: string;
    
    @ApiProperty()
    bandPhone: string;
        
    @ApiProperty()
    bandEmail: string;
    
    @ApiProperty()
    bandWebsite: string;
    
}