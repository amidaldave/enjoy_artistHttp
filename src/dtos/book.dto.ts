import { ApiProperty } from "@nestjs/swagger";

export class BookDto{
    
    @ApiProperty()
    bookTitle: string;
    
    @ApiProperty()
    bookDate: Date;
    
    @ApiProperty()
    bookIsbn: string;
    
}