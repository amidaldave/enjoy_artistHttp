import { ApiProperty } from "@nestjs/swagger";

export class SocialDto{
    
    @ApiProperty() 
    socialNetwork: string;

    @ApiProperty()
    socialUser: string;
}