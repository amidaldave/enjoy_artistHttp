import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto{

    @ApiProperty()
    articleTitle: string;

    @ApiProperty()
    articleHeadLine: string;

    @ApiProperty()
    articleSection: string;

    @ApiProperty()
    articleText: string;

}