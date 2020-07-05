import { ApiProperty } from "@nestjs/swagger";

export class ArtistArticleDto{        

    @ApiProperty()
    artisteId: number;
    
    @ApiProperty()
    articleId: number;
}